import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Link from '../../components/Link';
import Text from '../../components/Text';
import HR from '../../components/HR';
import SEO from '../../components/seo';
import Figure from '../../components/Figure';
import * as styles from './styles.module.scss';

type BlogPostQueryResult = {
  data: {
    mdx: {
      id: string;
      body: string & ReactNode;
      frontmatter: {
        title: string;
      };
    };
  };
};

export default function BlogPost({ data: { mdx } }: BlogPostQueryResult) {
  return (
    <>
      <SEO title={mdx.frontmatter.title} />
      <Text container="div" color="dark">
        <Text weight={600} className={styles.title}>
          {mdx.frontmatter.title}
        </Text>
        <MDXProvider
          components={{
            hr: HR,
            a: Link,
            Figure,
            Link,
            Text,
          }}
        >
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
      </Text>
    </>
  );
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`;
