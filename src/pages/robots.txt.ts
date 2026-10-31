import profile from '../../content/profile.json';
export function GET() {
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${profile.url.replace(/\/$/, '')}/sitemap.xml\n`);
}
