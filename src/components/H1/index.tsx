import React, { ReactNode } from 'react';
import ContentBlock from '../ContentBlock';
import Text from '../Text';
import * as styles from './styles.module.scss';

export default function H1({ children }: { children: ReactNode }) {
  return (
    <ContentBlock>
      <Text
        color="headingLight"
        size="2.5rem"
        weight={600}
        className={styles.h1}
        container="div"
      >
        {children}
      </Text>
    </ContentBlock>
  );
}
