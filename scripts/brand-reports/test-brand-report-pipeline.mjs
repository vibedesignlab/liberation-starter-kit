#!/usr/bin/env node

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = path.resolve(SCRIPT_DIRECTORY, '..', '..');
const FIXTURE_ROOT = path.join(SOURCE_ROOT, 'tests', 'fixtures', 'brand-reports');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function run(projectRoot, command, args, { expectedStatus = 0 } = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  const status = result.status ?? 1;
  if (status !== expectedStatus) {
    throw new Error([
      `Expected exit ${expectedStatus}, received ${status}: ${command} ${args.join(' ')}`,
      result.stdout,
      result.stderr,
    ].filter(Boolean).join('\n'));
  }
  return `${result.stdout}${result.stderr}`;
}

function copyRuntime(projectRoot) {
  for (const relativePath of [
    '.agents',
    'package.json',
    'scripts/brand-reports',
    'src/utils/brand-reports',
  ]) {
    cpSync(path.join(SOURCE_ROOT, relativePath), path.join(projectRoot, relativePath), {
      recursive: true,
    });
  }
}

function setPipelineReviewLink(packageRoot, statePath) {
  const reviewPath = path.join(packageRoot, 'stage-review.json');
  const review = readJson(reviewPath);
  review.pipeline_state_path = statePath;
  writeJson(reviewPath, review);
}

function createPipeline(projectRoot) {
  const pipelineRoot = path.join(projectRoot, 'fixture-pipeline');
  const packages = {
    stage_1: path.join(pipelineRoot, '01-source-brand'),
    stage_2: path.join(pipelineRoot, '02-extended-brand'),
    stage_3: path.join(pipelineRoot, '03-landing-materials'),
  };
  cpSync(path.join(FIXTURE_ROOT, 'stage-1'), packages.stage_1, { recursive: true });
  cpSync(path.join(FIXTURE_ROOT, 'stage-2'), packages.stage_2, { recursive: true });
  cpSync(path.join(FIXTURE_ROOT, 'stage-3'), packages.stage_3, { recursive: true });

  const stage2InputPath = path.join(packages.stage_2, 'transfer-input.json');
  const stage2Input = readJson(stage2InputPath);
  stage2Input.source_analysis.package_path = packages.stage_1;
  writeJson(stage2InputPath, stage2Input);

  const stage3InputPath = path.join(packages.stage_3, 'landing-input.json');
  const stage3Input = readJson(stage3InputPath);
  stage3Input.extended_brand_source.package_path = packages.stage_2;
  writeJson(stage3InputPath, stage3Input);

  const statePath = path.join(pipelineRoot, 'pipeline-state.json');
  const state = readJson(path.join(
    projectRoot,
    '.agents/skills/reconstruct-brand-system/assets/pipeline-state.json',
  ));
  state.created_at = '2026-08-23T00:00:00Z';
  state.updated_at = '2026-08-23T00:00:00Z';
  state.execution.mode = 'fixture_serial';
  state.stages.stage_1.started_at = '2026-08-23T00:00:00Z';
  for (const [stageId, packageRoot] of Object.entries(packages)) {
    state.stages[stageId].package_path = packageRoot;
  }
  writeJson(statePath, state);
  Object.values(packages).forEach((packageRoot) => setPipelineReviewLink(packageRoot, statePath));
  return { packages, pipelineRoot, statePath };
}

function registryEntry(projectRoot, stage) {
  const registry = readJson(path.join(projectRoot, 'public/brand-reports/registry.json'));
  const entry = registry.reports.find((item) => item.stage === stage);
  assert.ok(entry, `Registry must contain ${stage}.`);
  return entry;
}

function registeredReview(projectRoot, stage) {
  const entry = registryEntry(projectRoot, stage);
  return readJson(path.join(projectRoot, 'public', ...entry.review_url.split('/').filter(Boolean)));
}

function finalize(projectRoot, packageRoot, { id = '' } = {}) {
  const args = [
    path.join(projectRoot, 'scripts/brand-reports/finalize-brand-report.mjs'),
    packageRoot,
  ];
  if (id) args.push('--id', id);
  run(projectRoot, 'node', args);
}

function advance(projectRoot, statePath) {
  return run(projectRoot, 'python3', [
    path.join(projectRoot, '.agents/skills/reconstruct-brand-system/scripts/advance_pipeline.py'),
    statePath,
    '--decision',
    'accepted',
    '--feedback',
    'Automated fixture acceptance.',
  ]);
}

function assertRegisteredStatus(projectRoot, stage, status) {
  assert.equal(registeredReview(projectRoot, stage).status, status);
}

function assertSamePath(actual, expected) {
  assert.equal(realpathSync(actual), realpathSync(expected));
}

function testPipeline(projectRoot) {
  const { packages, statePath } = createPipeline(projectRoot);
  const finalizerPath = path.join(projectRoot, 'scripts/brand-reports/finalize-brand-report.mjs');
  const disabledFinalizerPath = `${finalizerPath}.disabled`;

  finalize(projectRoot, packages.stage_1, { id: 'fixture-source-stable' });
  assertRegisteredStatus(projectRoot, 'source_brand_analysis', 'pending');

  renameSync(finalizerPath, disabledFinalizerPath);
  const failureOutput = run(projectRoot, 'python3', [
    path.join(projectRoot, '.agents/skills/reconstruct-brand-system/scripts/advance_pipeline.py'),
    statePath,
    '--decision',
    'accepted',
    '--feedback',
    'This acceptance must roll back.',
  ], { expectedStatus: 1 });
  assert.match(failureOutput, /CHAIN_REASON=STORYBOOK_REGISTRATION_STALE/);
  assert.equal(readJson(path.join(packages.stage_1, 'stage-review.json')).status, 'pending');
  assert.equal(readJson(statePath).current_stage, 'stage_1');
  assertRegisteredStatus(projectRoot, 'source_brand_analysis', 'pending');
  renameSync(disabledFinalizerPath, finalizerPath);

  const sourceValidatorPath = path.join(
    projectRoot,
    '.agents/skills/research-brand-anatomy/scripts/validate_analysis.py',
  );
  const disabledSourceValidatorPath = `${sourceValidatorPath}.disabled`;
  renameSync(sourceValidatorPath, disabledSourceValidatorPath);
  assert.match(advance(projectRoot, statePath), /NEXT_STAGE=stage_2/);
  renameSync(disabledSourceValidatorPath, sourceValidatorPath);
  assert.equal(readJson(path.join(packages.stage_1, 'stage-review.json')).status, 'accepted');
  assertRegisteredStatus(projectRoot, 'source_brand_analysis', 'accepted');
  const sourceReceipt = readJson(path.join(packages.stage_1, 'registration-receipt.json'));
  assert.equal(sourceReceipt.review_status, 'accepted');
  assert.equal(
    sourceReceipt.report_id,
    registryEntry(projectRoot, 'source_brand_analysis').id,
  );
  const stage2Input = readJson(path.join(packages.stage_2, 'transfer-input.json'));
  assertSamePath(stage2Input.source_analysis.package_path, packages.stage_1);
  assert.equal(stage2Input.source_analysis.review_status, 'accepted');

  finalize(projectRoot, packages.stage_2);
  assertRegisteredStatus(projectRoot, 'extended_brand_anatomy', 'pending');
  assert.match(advance(projectRoot, statePath), /NEXT_STAGE=stage_3/);
  assertRegisteredStatus(projectRoot, 'extended_brand_anatomy', 'accepted');
  const stage3Input = readJson(path.join(packages.stage_3, 'landing-input.json'));
  assertSamePath(stage3Input.extended_brand_source.package_path, packages.stage_2);

  finalize(projectRoot, packages.stage_3);
  assertRegisteredStatus(projectRoot, 'landing_materials', 'pending');
  assert.match(advance(projectRoot, statePath), /CHAIN_ACTION=COMPLETE/);
  assertRegisteredStatus(projectRoot, 'landing_materials', 'accepted');

  const finalState = readJson(statePath);
  assert.equal(finalState.status, 'complete');
  assert.equal(finalState.transition_log.length, 3);
  const registry = readJson(path.join(projectRoot, 'public/brand-reports/registry.json'));
  assert.equal(registry.reports.length, 3);

  for (const entry of registry.reports) {
    run(projectRoot, 'node', [
      path.join(projectRoot, 'scripts/brand-reports/finalize-brand-report.mjs'),
      packages[
        entry.stage === 'source_brand_analysis'
          ? 'stage_1'
          : entry.stage === 'extended_brand_anatomy'
            ? 'stage_2'
            : 'stage_3'
      ],
      '--registration-only',
      '--check',
    ]);
  }

  const landingEntry = registry.reports.find((entry) => entry.stage === 'landing_materials');
  assert.ok(landingEntry);
  const unregisterScript = path.join(
    projectRoot,
    'scripts/brand-reports/unregister-brand-report.mjs',
  );
  assert.match(
    run(projectRoot, 'node', [unregisterScript, landingEntry.id, '--dry-run']),
    /WOULD_UNREGISTER/,
  );
  assert.match(run(projectRoot, 'node', [unregisterScript, landingEntry.id]), /UNREGISTERED/);
  run(projectRoot, 'node', [unregisterScript, landingEntry.id, '--check']);
  const registryAfterUnregister = readJson(
    path.join(projectRoot, 'public/brand-reports/registry.json'),
  );
  assert.equal(registryAfterUnregister.reports.length, 2);
  assert.equal(
    registryAfterUnregister.reports.some((entry) => entry.id === landingEntry.id),
    false,
  );
}

function main() {
  assert.ok(existsSync(FIXTURE_ROOT), `Fixture root is missing: ${FIXTURE_ROOT}`);
  const temporaryRoot = mkdtempSync(path.join(tmpdir(), 'brand-report-pipeline-'));
  const keepFixture = process.env.KEEP_BRAND_REPORT_FIXTURE === '1';
  try {
    copyRuntime(temporaryRoot);
    testPipeline(temporaryRoot);
    process.stdout.write('PASS brand report fixture finalization and router acceptance path.\n');
    if (keepFixture) process.stdout.write(`FIXTURE_PROJECT=${temporaryRoot}\n`);
  } finally {
    if (!keepFixture) rmSync(temporaryRoot, { recursive: true, force: true });
  }
}

main();
