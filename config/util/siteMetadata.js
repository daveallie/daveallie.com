const { SUBSITE_URL } = require('./subsite');

// Shared by gatsby-config.js and the SEO component. The SEO component runs
// inside Gatsby's Head API, which can't use useStaticQuery, so this metadata
// has to be reachable as a plain module rather than only via GraphQL.
module.exports = {
  title: 'Dave Allie',
  description: '',
  author: '@daveallie',
  siteUrl: SUBSITE_URL,
};
