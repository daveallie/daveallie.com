import React, { ReactNode } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import * as styles from './styles.module.scss';

type LinkProps = {
  href: string;
  gatsby?: boolean;
  children: ReactNode;
};

export default function Link({ href, gatsby = false, children }: LinkProps) {
  if (gatsby) {
    return (
      <GatsbyLink to={href} className={styles.link}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={href} className={styles.link}>
      {children}
    </a>
  );
}
