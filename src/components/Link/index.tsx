import React, { ReactNode } from 'react';
import * as styles from './styles.module.scss';

export default function Link({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={styles.link}>
      {children}
    </a>
  );
}
