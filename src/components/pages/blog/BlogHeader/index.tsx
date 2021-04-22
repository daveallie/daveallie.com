import React from 'react';
import Text from '../../../Text';
import Link from '../../../Link';
import H1 from '../../../H1';
import * as styles from './styles.module.scss';

export default function BlogHeader({
  title,
  titleStandalone,
}: {
  title: string;
  titleStandalone?: boolean;
}) {
  return (
    <>
      {!titleStandalone ? (
        <div className={styles.blogHeader}>
          <Text weight={500} color="headingLight" size="1.6rem">
            <Link href="/" color="ultraLight" gatsby underline={false}>
              Dave Allie
            </Link>
          </Text>
        </div>
      ) : null}
      <div className={titleStandalone ? styles.titleStandalone : styles.title}>
        <H1 size="4rem">{title}</H1>
      </div>
    </>
  );
}
