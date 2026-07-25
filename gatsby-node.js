const path = require('path');
const createBlogPages = require('./gatsby/node/createBlogPages');
const createTimeToReadNodeField = require('./gatsby/node/createTimeToReadNodeField');
const createDeckNode = require('./gatsby/node/createDeckNode');
const createSlidesPages = require('./gatsby/node/createSlidesPages');
const createTagPages = require('./gatsby/node/createTagPages');
const moveSubsitePage = require('./gatsby/node/moveSubsitePage');
const { SUBSITE } = require('./config/util/subsite');

const mdxResolverPassthrough =
  (fieldName) => async (source, args, context, info) => {
    const type = info.schema.getType(`Mdx`);
    const mdxNode = context.nodeModel.getNodeById({
      id: source.parent,
    });
    const resolver = type.getFields()[fieldName].resolve;
    return await resolver(mdxNode, args, context, {
      fieldName,
    });
  };

exports.onPreInit = () => {
  console.log(`=====\nBuilding subsite: ${SUBSITE}\n=====`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  if (SUBSITE === 'blog') {
    await createBlogPages({ graphql, createPage });
    await createTagPages({ graphql, createPage });
  }
  if (SUBSITE === 'slides') {
    await createSlidesPages({ graphql, createPage });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  moveSubsitePage(page, { createPage, deletePage });
};

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode, createNodeField, createParentChildLink } = actions;

  createTimeToReadNodeField(node, { createNodeField });
  if (SUBSITE === 'slides') {
    createDeckNode(node, {
      getNode,
      createNodeId,
      createContentDigest,
      createNode,
      createParentChildLink,
    });
  }
};

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
  });

  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }

  // Every stylesheet is a CSS module with hashed class names, so no two of them
  // can collide and the order they land in the bundle doesn't matter. Without
  // this, mini-css-extract-plugin warns for every pair of components imported
  // in a different order on different pages.
  const config = getConfig();
  const miniCssExtract = config.plugins?.find(
    (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin',
  );

  if (miniCssExtract) {
    miniCssExtract.options.ignoreOrder = true;
    actions.replaceWebpackConfig(config);
  }
};

exports.createSchemaCustomization = ({ actions, schema }) => {
  actions.createTypes(
    schema.buildObjectType({
      name: 'Deck',
      fields: {
        id: { type: 'ID!' },
        slug: {
          type: 'String!',
        },
        frontmatter: {
          type: 'MdxFrontmatter',
          resolve: mdxResolverPassthrough('frontmatter'),
        },
        body: {
          type: 'String!',
          resolve: mdxResolverPassthrough('body'),
        },
      },
      interfaces: ['Node'],
    }),
  );
};
