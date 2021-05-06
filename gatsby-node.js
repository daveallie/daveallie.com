const path = require('path');
const createBlogPages = require('./gatsby/node/createBlogPages');
const createTagPages = require('./gatsby/node/createTagPages');
const moveSubsitePage = require('./gatsby/node/moveSubsitePage');
const { SUBSITE } = require('./config/util/subsite');

exports.onPreInit = () => {
  console.log(`=====\nBuilding subsite: ${SUBSITE}\n=====`);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  if (SUBSITE === 'blog') {
    await createBlogPages({ graphql, createPage });
    await createTagPages({ graphql, createPage });
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  moveSubsitePage(page, { createPage, deletePage });
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
};
