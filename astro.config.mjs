import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

const profile = JSON.parse(readFileSync(new URL('./content/profile.json', import.meta.url), 'utf8'));
const production = new URL(profile.url);

export default defineConfig({
  site: production.origin,
  base: process.env.SITE_BASE_PATH ?? (production.pathname.replace(/\/$/, '') || '/'),
  output: 'static',
  trailingSlash: 'always',
  compressHTML: false,
  server: { host: '127.0.0.1', port: 4321 },
  devToolbar: { enabled: false },
});
