const createBlogPages = require('./gatsby/node/createBlogPages');
const moveSubsitePage = require('./gatsby/node/moveSubsitePage');
const { BUILD_SUBSITE } = require('./config/util/subsite');

exports.onPreInit = () => {
  console.log(`=====\nBuilding subsite: ${BUILD_SUBSITE}\n=====`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  if (BUILD_SUBSITE === 'blog') {
    await createBlogPages({ graphql, createPage });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  moveSubsitePage(page, { createPage, deletePage });
};

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};
