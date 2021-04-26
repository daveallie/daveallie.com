import React, { ReactNode } from 'react';
import ContentHeaderContainer from './ContentHeaderContainer';
import * as styles from './styles.module.scss';

export default function H1({
  size = '2.5rem',
  children,
}: {
  size?: string;
  children: ReactNode;
}) {
  return (
    <ContentHeaderContainer
      textColor="headingLight"
      textSize={size}
      textWeight={600}
      textClassName={styles.h1}
      anchorTag={false}
      children={children}
    />
  );
}
