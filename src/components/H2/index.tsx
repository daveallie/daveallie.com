import React, { ReactNode } from 'react';
import ContentBlock from '../ContentBlock';
import Text from '../Text';
import * as styles from './styles.module.scss';

export default function H2({ children }: { children: ReactNode }) {
  return (
    <ContentBlock>
      <Text size="1.5rem" weight={600} className={styles.h2} container="div">
        {children}
      </Text>
    </ContentBlock>
  );
}
