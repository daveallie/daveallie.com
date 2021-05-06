import React from 'react';
import { H1 } from '~/components/ContentHeader';
import Link from '~/components/Link';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

export default function PageHeader({
  title,
  titleStandalone,
}: {
  title: string;
  titleStandalone?: boolean;
}) {
  if (titleStandalone) {
    return (
      <div className={styles.titleStandalone}>
        <H1 size="4rem">{title}</H1>
      </div>
    );
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <Text weight={500} color="headingLight" size="1.6rem">
          <Link href="/" color="ultraLight" gatsby underline={false}>
            Dave Allie
          </Link>
        </Text>
      </div>
      <div className={styles.title}>
        <H1>{title}</H1>
      </div>
    </>
  );
}
