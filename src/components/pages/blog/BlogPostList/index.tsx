import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Link from '../../../Link';
import Text from '../../../Text';
import ContentBlock from '../../../ContentBlock';
import * as styles from './styles.module.scss';

type BlogPostListQueryNode = {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    year: string;
  };
};

type BlogPostListQueryResult = {
  allMdx: {
    nodes: BlogPostListQueryNode[];
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
            year: date(formatString: "YYYY")
          }
        }
      }
    }
  `);

  const yearData = data.allMdx.nodes.reduce<{
    [year: string]: BlogPostListQueryNode[];
  }>(
    (acc, node) => ({
      ...acc,
      [node.frontmatter.year]: [...(acc[node.frontmatter.year] || []), node],
    }),
    {}
  );
  const keys = Object.keys(yearData).sort((a, b) => (a > b ? -1 : 1));

  return (
    <Text container="div" className={styles.container}>
      {keys.map((year) => (
        <ContentBlock negTopMargin={year === keys[0]}>
          <Text weight={800}>{year}</Text>
          {yearData[year].map((node) => (
            <div key={node.id} className={styles.postRow}>
              <div className={styles.postDate}>{node.frontmatter.date}</div>
              <div>
                <Link href={`/${node.frontmatter.slug}`} gatsby>
                  {node.frontmatter.title}
                </Link>
              </div>
            </div>
          ))}
        </ContentBlock>
      ))}
    </Text>
  );
}
