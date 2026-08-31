import { readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../../', import.meta.url));
const fromRoot = (...parts) => join(projectRoot, ...parts);
const read = (...parts) => readFileSync(fromRoot(...parts), 'utf8');
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(fullPath);
    return ['.js', '.jsx', '.mjs'].includes(extname(entry.name)) ? [fullPath] : [];
  });
}

const copy = read('src', 'data', 'mora', 'copy.js');
const assets = read('src', 'data', 'mora', 'assets.js');
const content = read('src', 'data', 'mora', 'content.js');
const page = read('src', 'pages', 'MoraLandingPage.jsx');

check(!/^\s*import\s/m.test(copy), 'copy.js must not import UI, assets, or other modules.');
check(!/\/brand-reports\//.test(copy), 'copy.js must not contain registered asset paths.');
check(!/\.(?:png|jpe?g|webp|avif|gif|svg)(?:[?'"`]|$)/i.test(copy), 'copy.js must not contain image filenames.');
check(!/from\s+['"].*\/(?:copy|content)['"]/.test(assets), 'assets.js must not depend on copy.js or content.js.');

check(/from\s+['"]\.\/assets['"]/.test(content), 'content.js must import assets.js.');
check(/from\s+['"]\.\/copy['"]/.test(content), 'content.js must import copy.js.');

check(/from\s+['"]\.\.\/data\/mora\/content['"]/.test(page), 'MoraLandingPage.jsx must consume content.js.');
check(!/data\/mora\/(?:assets|copy)/.test(page), 'MoraLandingPage.jsx must not import assets.js or copy.js directly.');

const componentFiles = sourceFiles(fromRoot('src', 'components', 'mora-landing'));
for (const file of componentFiles) {
  const source = readFileSync(file, 'utf8');
  check(!/data\/mora/.test(source), `${relative(projectRoot, file)} must receive content through props.`);
}

const storyFiles = sourceFiles(fromRoot('src', 'stories', 'mora-landing'));
for (const file of storyFiles) {
  const source = readFileSync(file, 'utf8');
  check(!/data\/mora\/(?:assets|copy)/.test(source), `${relative(projectRoot, file)} must use composed content, not raw copy/assets.`);
}

const registeredAssetRoot = '/brand-reports/mora-infused-greek-yogurt-landing-materials/assets';
for (const file of sourceFiles(fromRoot('src'))) {
  if (file.endsWith(join('src', 'data', 'mora', 'assets.js'))) continue;
  const source = readFileSync(file, 'utf8');
  check(!source.includes(registeredAssetRoot), `${relative(projectRoot, file)} contains a direct Stage 3 asset path.`);
}

if (failures.length) {
  console.error('MORA module boundary check failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('PASS MORA UI/copy/image module boundaries.');
