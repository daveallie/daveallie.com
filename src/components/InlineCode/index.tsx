import React, { ReactNode } from 'react';
import * as styles from './styles.module.scss';

export default function InlineCode({ children }: { children: ReactNode }) {
  return <code className={styles.inlineCode}>{children}</code>;
}
