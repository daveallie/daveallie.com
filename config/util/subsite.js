const SUBSITES = {
  home: {
    url: 'https://daveallie.com',
  },
  blog: {
    url: 'https://blog.daveallie.com',
  },
  meet: {
    url: 'https://meet.daveallie.com',
  },
};
const DEFAULT_SUBSITE = 'home';

const SUBSITE =
  Object.keys(SUBSITES).find((s) => s === process.env.SUBSITE) ||
  DEFAULT_SUBSITE;

const getPathSubsite = (path) =>
  Object.keys(SUBSITES).find((s) => path.startsWith(`/${s}/`));

module.exports = {
  SUBSITE,
  SUBSITE_URL: SUBSITES[SUBSITE].url,
  getPathSubsite,
};
