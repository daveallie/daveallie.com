import React from 'react';
import cn from 'classnames';
import ContentBlock from '~/components/ContentBlock';
import Link from '~/components/Link';
import Text from '~/components/Text';
import { BlogPostListQueryNode } from '~/hooks/queries/useBlogPostListQuery';
import * as styles from './styles.module.scss';

type BlogPostListProps = {
  data: BlogPostListQueryNode[];
};

export default function BlogPostList({ data }: BlogPostListProps) {
  const yearData = data.reduce<{
    [year: string]: BlogPostListQueryNode[];
  }>(
    (acc, node) => ({
      ...acc,
      [node.frontmatter.year]: [...(acc[node.frontmatter.year] || []), node],
    }),
    {},
  );
  const keys = Object.keys(yearData).sort((a, b) => (a > b ? -1 : 1));

  return (
    <Text container="div">
      {keys.map((year, yearI) => (
        <ContentBlock width="wide" key={year}>
          <Text
            container="div"
            weight={800}
            size="1.2rem"
            className={cn({ [styles.firstYearRow]: yearI === 0 })}
          >
            {year}
          </Text>
          {yearData[year].map((node, postI) => (
            <div
              key={node.id}
              className={cn(styles.postRow, {
                [styles.firstPostRow]: postI === 0,
              })}
            >
              <Text
                container="div"
                className={styles.postDate}
                color="accent"
                size="1.1rem"
              >
                {node.frontmatter.date}
              </Text>
              <div>
                <Link href={`/${node.frontmatter.slug}`} gatsby>
                  <Text size="1.2rem">{node.frontmatter.title}</Text>
                </Link>
                <br />
                <Text>{node.frontmatter.description}</Text>
              </div>
            </div>
          ))}
        </ContentBlock>
      ))}
    </Text>
  );
}
