const path = require(`path`);

const SUBSITES = ['home', 'blog'];
const buildSubsite = SUBSITES.find((s) => s === process.env.SUBSITE) || 'home';

exports.onPreInit = () => {
  console.log(`=====\nBuilding subsite: ${buildSubsite}\n=====`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allMdx(limit: $limit) {
          edges {
            node {
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
      }
    `,
    { limit: 1000 }
  );

  if (result.errors) {
    throw result.errors;
  }

  if (buildSubsite === 'blog') {
    const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.tsx`);

    result.data.allMdx.edges
      .map(({ node }) => node)
      .filter((node) => node.parent.sourceInstanceName === 'blog-posts')
      .forEach((node) =>
        createPage({
          path: `/${node.frontmatter.slug}`,
          component: blogPostTemplate,
          context: { id: node.id },
        })
      );
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const pageSubsite = SUBSITES.find((s) => page.path.startsWith(`/${s}/`));

  if (!pageSubsite) {
    // not a subsite page, ignore
    return;
  }

  if (pageSubsite !== buildSubsite) {
    // subsite doesn't match page delete
    deletePage(page);
    return;
  }

  if (page.context.originalPath) {
    // already transformed, skip
    return;
  }
  const originalPath = page.path;

  deletePage(page);
  const pathReplaceRegex = new RegExp(`^\/${buildSubsite}`);
  const newPage = {
    ...page,
    path: page.path.replace(pathReplaceRegex, ''),
    matchPath: page.matchPath
      ? page.matchPath.replace(pathReplaceRegex, '')
      : page.matchPath,
    context: {
      ...page.context,
      originalPath,
    },
  };

  createPage(newPage);
};
