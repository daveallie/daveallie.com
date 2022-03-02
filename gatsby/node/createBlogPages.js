const path = require('path');

async function createBlogPages({ graphql, createPage }) {
  const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.tsx`);

  const result = await graphql(`
    query loadPagesQuery {
      allMdx(
        filter: { ${[
          'fields: { source: { eq: "blog" } }',
          ...(process.env.NODE_ENV === 'production'
            ? ['frontmatter: { published: { eq: true } }']
            : []),
        ].join(', ')} }) {
        nodes {
          id
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

  const { nodes } = result.data.allMdx;
  const slugs = nodes.map((node) => node.frontmatter.slug);
  const duplicatedSlug = slugs.find(
    (slug) => slugs.indexOf(slug) !== slugs.lastIndexOf(slug)
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
      component: blogPostTemplate,
      context: { id: node.id },
    })
  );
}

module.exports = createBlogPages;
