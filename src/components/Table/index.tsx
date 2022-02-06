import React, { ReactNode } from 'react';
import ContentBlock, { ContentBlockSpace } from '~/components/ContentBlock';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

export default function Table({
  spaceBefore,
  spaceAfter,
  children,
}: {
  spaceBefore?: ContentBlockSpace;
  spaceAfter?: ContentBlockSpace;
  children: ReactNode;
}) {
  return (
    <ContentBlock spaceBefore={spaceBefore} spaceAfter={spaceAfter}>
      <Text size="1.2rem" container="div">
        <table className={styles.table}>{children}</table>
      </Text>
    </ContentBlock>
  );
}
