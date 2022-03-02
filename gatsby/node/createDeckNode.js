function createDeckNode(
  node,
  {
    getNode,
    createContentDigest,
    createNodeId,
    createNode,
    createParentChildLink,
  }
) {
  if (node.internal.type !== `Mdx`) return;

  const fileNode = getNode(node.parent);
  const source = fileNode.sourceInstanceName;

  if (node.internal.type !== `Mdx` || source !== 'slides') return;

  const id = createNodeId(`${node.id} >>> Deck`);

  createNode({
    id,
    parent: node.id,
    children: [],
    internal: {
      type: `Deck`,
      contentDigest: createContentDigest(node.rawBody),
      content: node.rawBody,
      description: `Slide Decks`,
    },
  });
  createParentChildLink({ parent: fileNode, child: getNode(id) });
}

module.exports = createDeckNode;
