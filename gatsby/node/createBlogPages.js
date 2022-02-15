const path = require('path');

async function createBlogPages({ graphql, createPage }) {
  const result = await graphql(`
    query loadPagesQuery {
      allMdx${
        process.env.NODE_ENV === 'production'
          ? '(filter: { frontmatter: { published: { eq: true } } })'
          : ''
      } {
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

  const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.tsx`);

  const nodes = result.data.allMdx.nodes.filter(
    (node) => node.parent.sourceInstanceName === 'blog-posts'
  );

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
