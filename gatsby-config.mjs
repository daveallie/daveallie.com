import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import siteMetadata from './config/util/siteMetadata.js';
import subsite from './config/util/subsite.js';
import pluginFeedConfig from './gatsby/config/gatsbyPluginFeed.js';

// remark-math and rehype-katex are ESM-only, which is why this file is .mjs
// rather than .js. gatsby-node.js and gatsby-ssr.js are unaffected and stay
// CommonJS.
const { SUBSITE } = subsite;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const plugins = [
  {
    resolve: 'gatsby-plugin-robots-txt',
    options: {
      policy: [
        {
          userAgent: '*',
          disallow: ['/draft'],
        },
        {
          userAgent: '*',
          ...(process.env.GATSBY_VERCEL_ENV === 'preview' ||
          process.env.SUBSITE === 'slides'
            ? { disallow: ['/'] }
            : { allow: '/' }),
        },
      ],
    },
  },
  (SUBSITE === 'blog' || SUBSITE === 'home') && 'gatsby-plugin-sitemap',
  'gatsby-plugin-typescript',
  `gatsby-plugin-sharp`,
  `gatsby-plugin-image`,
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1200,
            disableBgImageOnAlpha: true,
            backgroundColor: 'transparent',
          },
        },
        'gatsby-remark-copy-linked-files',
      ],
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-sass',
    options: {
      sassOptions: {
        outputStyle: 'compressed',
        // gatsby-plugin-sass pins sass-loader ^10, which only speaks Dart
        // Sass's legacy JS API. Nothing we can configure switches it to the
        // modern API, so silence the deprecation until gatsby-plugin-sass
        // ships a newer sass-loader. Drop this when it does.
        silenceDeprecations: ['legacy-js-api'],
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
  'gatsby-plugin-mdx-source-name',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'blog',
      path: `${__dirname}/blog/posts/`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'slides',
      path: `${__dirname}/slides/`,
    },
  },
  {
    resolve: 'gatsby-plugin-env-variables',
    options: {
      allowList: ['SUBSITE'],
    },
  },
  {
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: ['G-VC4JCPT7M2'],
    },
  },
  SUBSITE === 'blog' && pluginFeedConfig,
];

export default {
  siteMetadata,
  plugins: plugins.filter(Boolean),
};
