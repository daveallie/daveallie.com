const path = require(`path`);
const { BUILD_SUBSITE, getPathSubsite } = require('./config/util/subsite');

exports.onPreInit = () => {
  console.log(`=====\nBuilding subsite: ${BUILD_SUBSITE}\n=====`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      query loadPagesQuery($limit: Int!) {
        allMdx(limit: $limit${
          process.env.NODE_ENV === 'production'
            ? ', filter: {frontmatter: {published: {eq: true}}}'
            : ''
        }) {
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

  if (BUILD_SUBSITE === 'blog') {
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
  const pageSubsite = getPathSubsite(page.path);

  if (!pageSubsite) {
    // not a subsite page, ignore
    return;
  }

  if (pageSubsite !== BUILD_SUBSITE) {
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
  const pathReplaceRegex = new RegExp(`^\/${BUILD_SUBSITE}`);
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

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};
