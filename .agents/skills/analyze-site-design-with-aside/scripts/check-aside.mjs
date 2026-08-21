#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { delimiter, join } from 'node:path';
import { homedir, platform } from 'node:os';

const args = new Set(process.argv.slice(2));
const outputJson = args.has('--json');
const commandTimeoutMs = 10_000;

function run(command, commandArgs) {
  try {
    const stdout = execFileSync(command, commandArgs, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: commandTimeoutMs,
    }).trim();

    return { ok: true, output: stdout };
  } catch (error) {
    const stdout = typeof error.stdout === 'string' ? error.stdout.trim() : '';
    const stderr = typeof error.stderr === 'string' ? error.stderr.trim() : '';
    return {
      ok: false,
      output: [stdout, stderr].filter(Boolean).join('\n'),
      reason: error.killed ? 'timeout' : 'command-failed',
    };
  }
}

function findExecutable(name) {
  const pathEntries = (process.env.PATH || '').split(delimiter).filter(Boolean);
  for (const entry of pathEntries) {
    const candidate = join(entry, name);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

const checks = [];
const currentPlatform = platform();

if (currentPlatform !== 'darwin') {
  checks.push({
    id: 'unsupported-platform',
    status: 'fail',
    message: `Aside currently requires macOS 15.0 or later; detected ${currentPlatform}.`,
  });
} else {
  checks.push({ id: 'platform', status: 'pass', message: 'macOS detected.' });

  const osVersionResult = run('/usr/bin/sw_vers', ['-productVersion']);
  if (!osVersionResult.ok) {
    checks.push({
      id: 'os-version-unknown',
      status: 'fail',
      message: 'Could not read the macOS version.',
    });
  } else {
    const majorVersion = Number.parseInt(osVersionResult.output.split('.')[0], 10);
    checks.push({
      id: majorVersion >= 15 ? 'os-version' : 'unsupported-platform',
      status: majorVersion >= 15 ? 'pass' : 'fail',
      message: majorVersion >= 15
        ? `macOS ${osVersionResult.output} satisfies the current Aside requirement.`
        : `macOS ${osVersionResult.output} is below Aside's current macOS 15.0 minimum.`,
      value: osVersionResult.output,
    });
  }
}

const appCandidates = [
  '/Applications/Aside.app',
  join(homedir(), 'Applications', 'Aside.app'),
];
const appPath = appCandidates.find((candidate) => existsSync(candidate));
checks.push({
  id: appPath ? 'browser' : 'browser-not-found',
  status: appPath ? 'pass' : 'warn',
  message: appPath
    ? `Aside Browser found at ${appPath}.`
    : 'Aside Browser was not found in a standard Applications directory; a nonstandard install may still work.',
  ...(appPath ? { value: appPath } : {}),
});

const asidePath = findExecutable('aside');
if (!asidePath) {
  checks.push({
    id: 'cli-not-found',
    status: 'fail',
    message: 'The aside CLI is not available on PATH.',
  });
} else {
  checks.push({
    id: 'cli',
    status: 'pass',
    message: `Aside CLI found at ${asidePath}.`,
    value: asidePath,
  });

  const versionResult = run(asidePath, ['--version']);
  checks.push({
    id: versionResult.ok ? 'cli-version' : 'cli-version-unknown',
    status: versionResult.ok ? 'pass' : 'warn',
    message: versionResult.ok
      ? `Aside CLI version: ${versionResult.output || 'reported without a version string'}.`
      : 'Aside CLI did not return a version string; account validation determines readiness.',
    ...(versionResult.output ? { value: versionResult.output } : {}),
  });

  const accountResult = run(asidePath, ['account', 'status']);
  const accountOutput = accountResult.output || '';
  const signedOut = /signed[ -]?out|not signed in|sign in to|unauthenticated|no (?:active )?account/i.test(accountOutput);
  const accountReady = accountResult.ok && !signedOut;

  checks.push({
    id: accountReady ? 'account' : 'account-unavailable',
    status: accountReady ? 'pass' : 'fail',
    message: accountReady
      ? 'Aside account status is available.'
      : 'Aside account validation failed or the selected account is signed out.',
  });
}

const unsupported = checks.some((check) => check.id === 'unsupported-platform' && check.status === 'fail');
const failed = checks.some((check) => check.status === 'fail');
const overall = unsupported ? 'unsupported' : failed ? 'setup-required' : 'ready';
const result = {
  schemaVersion: 1,
  overall,
  checkedAt: new Date().toISOString(),
  checks,
  next:
    overall === 'ready'
      ? 'Aside CLI preflight passed. Confirm the target URL and analysis scope before launching browser work.'
      : 'Follow references/aside-setup-spec.md for the matching check id, then rerun this script.',
};

if (outputJson) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  process.stdout.write(`Aside preflight: ${overall}\n`);
  for (const check of checks) {
    process.stdout.write(`- [${check.status.toUpperCase()}] ${check.id}: ${check.message}\n`);
  }
  process.stdout.write(`Next: ${result.next}\n`);
}

process.exit(overall === 'ready' ? 0 : overall === 'unsupported' ? 3 : 2);
