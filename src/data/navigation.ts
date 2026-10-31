export const navigation = [
  { key: 'home', title: 'About', path: '' },
  { key: 'research', title: 'Research', path: 'research/' },
  { key: 'innovation', title: 'Innovation', path: 'innovation/' },
  { key: 'publications', title: 'Publications', path: 'publications/' },
  { key: 'cv', title: 'CV', path: 'cv/' },
] as const;
export type PageKey = typeof navigation[number]['key'];
