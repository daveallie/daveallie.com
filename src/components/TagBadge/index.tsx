import React from 'react';
import Link from '~/components/Link';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <div className={styles.badgeContainer}>
      <Link href={`/tag/${tag}`} underline={false} gatsby>
        <div className={styles.badge}>
          <Text color="headingLight">{tag}</Text>
        </div>
      </Link>
    </div>
  );
}
