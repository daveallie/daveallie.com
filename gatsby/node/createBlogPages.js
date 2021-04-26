const path = require('path');

async function createBlogPages({ graphql, createPage }) {
  const result = await graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allMdx(limit: $limit${
          process.env.NODE_ENV === 'production'
            ? ', filter: {frontmatter: {published: {eq: true}}}'
            : ''
        }) {
          nodes {
            id
            frontmatter {
              slug
            }
            parent {
              ... on File {
                sourceInstanceName
              }
            }
          }
        }
      }
    `,
    { limit: 1000 }
  );

  if (result.errors) {
    throw result.errors;
  }

  const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.tsx`);

  result.data.allMdx.nodes
    .filter((node) => node.parent.sourceInstanceName === 'blog-posts')
    .forEach((node) =>
      createPage({
        path: `/${node.frontmatter.slug}`,
        component: blogPostTemplate,
        context: { id: node.id },
      })
    );
}

module.exports = createBlogPages;
