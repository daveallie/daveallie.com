function createDeckNode(
  node,
  { getNode, createNodeId, createNode, createParentChildLink },
) {
  if (node.internal.type !== `Mdx`) return;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type !== `Mdx` || source !== 'slides') return;

  const id = createNodeId(`${node.id} >>> Deck`);
  const { contentDigest, contentFilePath } = node.internal;

  createNode({
    id,
    parent: node.id,
    children: [],
    internal: {
      contentDigest,
      contentFilePath,
      type: `Deck`,
      content: node.body,
      description: `Slide Decks`,
    },
  });
  createParentChildLink({ parent: fileNode, child: getNode(id) });
}

module.exports = createDeckNode;
