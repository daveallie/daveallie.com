module.exports = {
  siteMetadata: {
    title: 'Dave Allie',
    description: '',
    author: '@daveallie',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('node-sass'),
        sassOptions: {
          outputStyle: 'compact',
        },
        cssLoaderOptions: {
          modules: {
            localIdentName:
              process.env.NODE_ENV === 'production'
                ? '[hash:base64:12]'
                : '[path][name]__[local]',
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Dave Allie',
        short_name: 'Dave Allie',
        start_url: '/',
        background_color: '#FF656D',
        theme_color: '#FF656D',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['material icons'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog-posts',
        path: `${__dirname}/blog/posts/`,
      },
    },
  ],
};
