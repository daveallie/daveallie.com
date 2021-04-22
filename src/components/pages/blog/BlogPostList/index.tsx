import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Link from '../../../Link';
import Text from '../../../Text';
import * as styles from './styles.module.scss';

type BlogPostListQueryResult = {
  allMdx: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        date: string;
        slug: string;
      };
    }[];
  };
};

export default function BlogPostList() {
  const data: BlogPostListQueryResult = useStaticQuery(graphql`
    query BlogPostListQuery {
      allMdx(
        filter: { frontmatter: { published: { eq: true } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        nodes {
          id
          frontmatter {
            title
            slug
            date(formatString: "ll")
          }
        }
      }
    }
  `);

  return (
    <Text container="div">
      {data.allMdx.nodes.map((node) => (
        <div key={node.id} className={styles.postRow}>
          <div className={styles.postDate}>{node.frontmatter.date}</div>
          <div>
            <Link href={`/${node.frontmatter.slug}`} gatsby>
              {node.frontmatter.title}
            </Link>
          </div>
        </div>
      ))}
    </Text>
  );
}
