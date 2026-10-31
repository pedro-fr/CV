import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { navigation } from '../src/data/navigation.ts';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const root = resolve(project, 'dist');
const profile = JSON.parse(await readFile(resolve(project, 'content/profile.json'), 'utf8'));
const production = new URL(profile.url);
const mount = `${(process.env.SITE_BASE_PATH ?? production.pathname).replace(/\/$/, '')}/`;
const paths = navigation.map(page => page.path);
let checked = 0;

for (const path of [...paths, '404.html']) {
  const file = path.endsWith('.html') ? path : `${path}index.html`;
  const html = await readFile(resolve(root, file), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: exactly one H1`);
  assert.equal((html.match(/aria-current="page"/g) || []).length, path === '404.html' ? 0 : 1, `${path}: active navigation`);
  assert(html.includes('lang="en"'), `${path}: document language`);
  assert(html.includes(`href="${production.origin}${mount}${path}"`), `${path}: canonical`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(ids.length, new Set(ids).size, `${path}: unique IDs`);

  for (const [, href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(href, `${production.origin}${mount}${path}`);
    if (url.origin !== production.origin) continue;
    assert(url.pathname.startsWith(mount), `${path}: link escapes the configured project path: ${href}`);
    let local = resolve(root, decodeURIComponent(url.pathname.slice(mount.length)));
    if (url.pathname.endsWith('/')) local = resolve(local, 'index.html');
    await access(local);
    if (url.hash) {
      const target = await readFile(local, 'utf8');
      assert(target.includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${href}`);
    }
    checked++;
  }
}
const index = JSON.parse(await readFile(resolve(root, 'assets/search.json'), 'utf8'));
assert.deepEqual(index.map(page => page.path), paths, 'Search includes all main pages');
assert(index.some(page => page.text.includes('Schwann')), 'Search indexes research content');
const cv = await readFile(resolve(root, 'cv/index.html'), 'utf8');
for (const item of [...profile.courses, ...profile.education, ...profile.languages, ...profile.skills]) {
  assert(cv.includes(item.title.replaceAll('&', '&amp;')), `CV preserves ${item.title}`);
}
await access(resolve(root, '.nojekyll'));
for (const legacy of ['pages/portfolio.html', 'pages/portfolio/index.html']) {
  const redirect = await readFile(resolve(root, legacy), 'utf8');
  assert(redirect.includes('http-equiv="refresh"'), `${legacy}: legacy redirect remains available`);
}
const home = await readFile(resolve(root, 'index.html'), 'utf8');
const main = home.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
assert.equal((main.match(/<h2[ >]/g) || []).length, 2, 'Homepage has only its two introductory sections');
assert(home.includes(profile.orcid), 'ORCID link is preserved');
console.log(`Verified ${paths.length} pages, 404, ${checked} local links/assets under ${mount}, search, CV and legacy redirects.`);
