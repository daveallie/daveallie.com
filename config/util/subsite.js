const SUBSITES = {
  home: {
    url: 'https://daveallie.com',
  },
  blog: {
    url: 'https://blog.daveallie.com',
  },
};
const DEFAULT_SUBSITE = 'home';

const BUILD_SUBSITE =
  Object.keys(SUBSITES).find((s) => s === process.env.SUBSITE) ||
  DEFAULT_SUBSITE;

const getPathSubsite = (path) =>
  Object.keys(SUBSITES).find((s) => path.startsWith(`/${s}/`));

module.exports = {
  BUILD_SUBSITE,
  SUBSITE_URL: SUBSITES[BUILD_SUBSITE].url,
  getPathSubsite,
};
