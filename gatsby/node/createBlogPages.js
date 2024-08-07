const path = require('path');

async function createBlogPages({ graphql, createPage }) {
  const result = await graphql(`
    query loadPagesQuery {
      allMdx(
        filter: {
          ${process.env.NODE_ENV === 'production' ? 'frontmatter: { published: { eq: true } }' : ''}
          fields: { source: { eq: "blog" } }
        }) {
        nodes {
          id
          internal {
            contentFilePath
          }
          frontmatter {
            slug
            unlisted
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.tsx`);
  const { nodes } = result.data.allMdx;
  const slugs = nodes.map((node) => node.frontmatter.slug);
  const duplicatedSlug = slugs.find(
    (slug) => slugs.indexOf(slug) !== slugs.lastIndexOf(slug),
  );
  if (duplicatedSlug) {
    throw `Duplicated slug: ${duplicatedSlug}`;
  }

  nodes.forEach((node) =>
    createPage({
      path: [
        process.env.NODE_ENV === 'production' && node.frontmatter.unlisted
          ? '/draft/'
          : '/',
        node.frontmatter.slug,
      ].join(''),
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    }),
  );
}

module.exports = createBlogPages;
