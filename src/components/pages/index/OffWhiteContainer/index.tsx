import React, { ReactNode } from 'react';
import * as styles from './styles.module.scss';

export default function OffWhiteContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={styles.container}>{children}</div>;
}
