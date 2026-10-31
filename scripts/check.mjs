import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const paths=['','research/','innovation/','publications/','cv/'];
const origin='https://pedro-fr.github.io';
const mount='/CV/';
let checked=0;
for(const path of paths){
 const html=await readFile(resolve(root,path,'index.html'),'utf8');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${path}: exactly one H1`);
 assert.equal((html.match(/aria-current="page"/g)||[]).length,1,`${path}: active navigation`);
 assert(html.includes('<html lang="en">'),`${path}: document language`);
 assert(html.includes(`href="${origin}${mount}${path}"`),`${path}: canonical`);
 assert(!html.includes('pedro@example.com'),`${path}: placeholder contact`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
 assert.equal(ids.length,new Set(ids).size,`${path}: unique IDs`);
 for(const [,href] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const url=new URL(href,origin+mount+path);
  if(url.origin!==origin)continue;
  assert(url.pathname.startsWith(mount),`${path}: link escapes GitHub Pages project path: ${href}`);
  let local=resolve(root,decodeURIComponent(url.pathname.slice(mount.length)));
  if(url.pathname.endsWith('/'))local=resolve(local,'index.html');
  await access(local);
  if(url.hash){const target=await readFile(local,'utf8');assert(target.includes(`id="${url.hash.slice(1)}"`),`Missing anchor: ${href}`);}
  checked++;
 }
}
const index=JSON.parse(await readFile(resolve(root,'assets/search.json'),'utf8'));
assert.deepEqual(index.map(x=>x.path),paths,'Search includes all pages');
assert(index.some(x=>x.text.includes('Schwann')),'Search indexes research content');
const profile=JSON.parse(await readFile(resolve(root,'content/profile.json'),'utf8'));
const cv=await readFile(resolve(root,'cv/index.html'),'utf8');
for(const item of [...profile.courses,...profile.education,...profile.languages,...profile.skills]){
 const escape=s=>s.replaceAll('&','&amp;').replaceAll('’','’');
 assert(cv.includes(escape(item.title)),`CV preserves ${item.title}`);
}
assert(cv.includes('2024 – 2025 (expected)'),'Preserve source education status');
console.log(`Verified ${paths.length} pages and ${checked} local links/assets under /CV/, search index and CV content.`);
