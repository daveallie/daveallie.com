import React from 'react';
import useBlogPostListQuery, {
  BlogPostListQueryNode,
} from '../../../../hooks/queries/useBlogPostListQuery';
import ContentBlock from '../../../ContentBlock';
import Link from '../../../Link';
import Text from '../../../Text';
import * as styles from './styles.module.scss';

export default function BlogPostList() {
  const data = useBlogPostListQuery();

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
        <ContentBlock negTopMargin={year === keys[0]} key={year}>
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