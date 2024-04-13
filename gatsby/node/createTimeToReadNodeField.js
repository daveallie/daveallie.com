const readingTime = require(`reading-time`);

function createTimeToReadNodeField(node, { createNodeField }) {
  if (node.internal.type !== 'Mdx') return;

  createNodeField({
    node,
    name: 'timeToRead',
    value: readingTime(node.body),
  });
}

module.exports = createTimeToReadNodeField;
