import React from 'react';
import Link from '~/components/Link';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

export default function Error404({ home }: { home: string }) {
  return (
    <div className={styles.container}>
      <Text weight={800} color="headingLight" size="20vw">
        404!
      </Text>
      <Text weight={600} color="subheadingLight" size="5vw">
        Oops! That page doesn't exist!
      </Text>
      <Text weight={400} color="subheadingLight" size="2.5vw">
        Head back to{' '}
        <Link href={home} color="light">
          {home}
        </Link>
      </Text>
    </div>
  );
}
