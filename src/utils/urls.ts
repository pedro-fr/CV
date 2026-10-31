// A single helper keeps navigation, images and search working under /CV/ or a custom domain.
export function url(path = '') {
  const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
  return `${base}${path.replace(/^\//, '')}`;
}
