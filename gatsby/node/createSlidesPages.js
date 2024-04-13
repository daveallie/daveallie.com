const path = require('path');

async function createSlidesPages({ graphql, createPage }) {
  const result = await graphql(`
    query loadAllDecks {
    allDeck${
      process.env.NODE_ENV === 'production'
        ? '(filter: { frontmatter: { published: { eq: true } } })'
        : ''
    } {
        nodes {
          id
          internal {
            contentFilePath
          }
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const slidesTemplate = path.resolve(`src/templates/Slideshow/index.tsx`);
  const { nodes } = result.data.allDeck;
  const slugs = nodes.map((node) => node.frontmatter.slug);
  const duplicatedSlug = slugs.find(
    (slug) => slugs.indexOf(slug) !== slugs.lastIndexOf(slug),
  );
  if (duplicatedSlug) {
    throw `Duplicated slug: ${duplicatedSlug}`;
  }

  nodes.forEach((node) =>
    createPage({
      path: `/${node.frontmatter.slug}`,
      matchPath: `/${node.frontmatter.slug}/*`,
      component: `${slidesTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    }),
  );
}

module.exports = createSlidesPages;
