const pluginFeedConfig = require('./gatsby/config/gatsbyPluginFeed');
const { SUBSITE, SUBSITE_URL } = require('./config/util/subsite');

const plugins = [
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [
        {
          userAgent: '*',
          ...(process.env.GATSBY_VERCEL_ENV === 'preview'
            ? { disallow: ['/'] }
            : { allow: '/' }),
        },
      ],
    },
  },
  'gatsby-plugin-sitemap',
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
        'gatsby-remark-copy-linked-files',
      ],
    },
  },
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-remark-copy-linked-files',
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
  {
    resolve: 'gatsby-plugin-env-variables',
    options: {
      allowList: ['SUBSITE'],
    },
  },
];

if (SUBSITE === 'blog') {
  plugins.push(pluginFeedConfig);
}

module.exports = {
  siteMetadata: {
    title: 'Dave Allie',
    description: '',
    author: '@daveallie',
    siteUrl: SUBSITE_URL,
  },
  plugins,
};
