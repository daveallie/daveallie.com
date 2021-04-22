import React, { ReactNode } from 'react';
import ContentBlock from '../ContentBlock';
import Text from '../Text';
import * as styles from './styles.module.scss';

export default function H3({ children }: { children: ReactNode }) {
  return (
    <ContentBlock>
      <Text size="1.2rem" weight={600} className={styles.h3} container="div">
        {children}
      </Text>
    </ContentBlock>
  );
}
