import profile from '../../content/profile.json';
import home from '../../content/pages/home.json';
import research from '../../content/pages/research.json';
import innovation from '../../content/pages/innovation.json';
import publications from '../../content/pages/publications.json';
import cv from '../../content/pages/cv.json';
import { navigation } from './navigation';

const details = {
  home: [...profile.about, ...profile.interests, home.eyebrow].join(' '),
  research: [research.heading, research.description, profile.research.title, profile.research.summary,
    ...profile.research.details, ...profile.projects.map(project => `${project.title} ${project.category} ${project.description}`)].join(' '),
  innovation: [innovation.heading, innovation.description, profile.innovation.title, profile.innovation.organization,
    profile.innovation.context, profile.innovation.involvement, profile.innovation.contribution,
    ...profile.innovation.work, ...profile.innovation.outcomes].join(' '),
  publications: [publications.heading, publications.description,
    ...profile.publications.map(publication => Object.values(publication).join(' '))].join(' '),
  cv: [cv.eyebrow, ...profile.about, profile.innovation.involvement, profile.research.title,
    profile.research.summary, ...profile.research.details,
    ...profile.publications.map(publication => Object.values(publication).join(' ')),
    ...[...profile.education, ...profile.courses, ...profile.skills, ...profile.languages].map(item => Object.values(item).join(' '))].join(' '),
};
export const searchIndex = navigation.map(page => ({ title: page.title, path: page.path, text: details[page.key] }));
