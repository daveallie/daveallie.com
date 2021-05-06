const { SUBSITE } = require('../../config/util/subsite');
const { getPathSubsite } = require('../../config/util/subsite');

function moveSubsitePage(page, { createPage, deletePage }) {
  const pageSubsite = getPathSubsite(page.path);

  if (!pageSubsite) {
    // not a subsite page, ignore
    return;
  }

  if (pageSubsite !== SUBSITE) {
    // subsite doesn't match page, delete
    deletePage(page);
    return;
  }

  if (page.context.originalPath) {
    // already transformed, skip
    return;
  }
  const originalPath = page.path;

  // replace original page with new page
  deletePage(page);
  const pathReplaceRegex = new RegExp(`^\/${SUBSITE}`);
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
  return newPage;
}

module.exports = moveSubsitePage;
