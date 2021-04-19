import React, { ReactNode } from 'react';
import * as styles from './styles.module.scss';

export default function ContentBlock({ children }: { children: ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
