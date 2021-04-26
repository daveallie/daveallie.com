import React, { ReactNode } from 'react';
import ContentHeaderContainer from './ContentHeaderContainer';
import * as styles from './styles.module.scss';

export default function H3({ children }: { children: ReactNode }) {
  return (
    <ContentHeaderContainer
      textSize="1.2rem"
      textWeight={600}
      textClassName={styles.h3}
      children={children}
    />
  );
}
