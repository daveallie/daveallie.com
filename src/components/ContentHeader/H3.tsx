import React, { ReactNode } from 'react';
import ContentHeaderContainer from './ContentHeaderContainer';
import * as styles from './styles.module.scss';

export default function H3({
  spaceBefore,
  children,
}: {
  spaceBefore?: 'none';
  children: ReactNode;
}) {
  return (
    <ContentHeaderContainer
      container="h3"
      spaceBefore={spaceBefore}
      textSize="1.2rem"
      textWeight={600}
      textClassName={styles.h3}
      children={children}
    />
  );
}
