import React, { ReactNode } from 'react';
import ContentHeaderContainer from './ContentHeaderContainer';
import * as styles from './styles.module.scss';

export default function H2({ children }: { children: ReactNode }) {
  return (
    <ContentHeaderContainer
      textSize="1.5rem"
      textWeight={600}
      textClassName={styles.h2}
      children={children}
    />
  );
}
