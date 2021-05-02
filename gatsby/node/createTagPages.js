const path = require('path');
const lodash = require('lodash');

async function createBlogPages({ graphql, createPage }) {
  const result = await graphql(`
    query loadTagsQuery {
      allMdx${
        process.env.NODE_ENV === 'production'
          ? '(filter: {frontmatter: {published: {eq: true}}})'
          : ''
      } {
        group(field: frontmatter___tags) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const blogsByTagTemplate = path.resolve(`src/templates/BlogsByTag/index.tsx`);

  result.data.allMdx.group.forEach((group) => {
    const pagePath = `/tag/${lodash.kebabCase(group.tag)}`;
    createPage({
      path: pagePath,
      component: blogsByTagTemplate,
      context: { tag: group.tag, tagPath: pagePath },
    });
  });
}

module.exports = createBlogPages;
