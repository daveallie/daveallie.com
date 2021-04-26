const pluginFeedConfig = {
  resolve: 'gatsby-plugin-feed',
  options: {
    query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
        }
      `,
    feeds: [
      {
        serialize: ({ query: { site, allMdx } }) =>
          allMdx.nodes.map((node) => ({
            title: node.frontmatter.title,
            author: node.frontmatter.author,
            description: node.frontmatter.description,
            date: node.frontmatter.date,
            url: `${site.siteMetadata.siteUrl}/${node.frontmatter.slug}`,
            guid: `${site.siteMetadata.siteUrl}/${node.frontmatter.slug}`,
          })),
        query: `
            {
              allMdx(
                filter: { frontmatter: { published: { eq: true } } }
                sort: { fields: frontmatter___date, order: DESC }
              ) {
                nodes {
                  frontmatter {
                    title
                    author
                    description
                    date
                    slug
                  }
                }
              }
            }
          `,
        output: '/rss.xml',
        title: "Dave Allie's Blog",
        description:
          'A collection of random thoughts and opinions from Dave Allie',
        site_url: 'https://blog.daveallie.com/',
      },
    ],
  },
};

module.exports = pluginFeedConfig;
