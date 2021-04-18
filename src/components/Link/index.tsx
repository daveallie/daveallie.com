import React, { ReactNode } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import * as styles from './styles.module.scss';

type LinkProps = {
  href: string;
  light?: boolean;
  gatsby?: boolean;
  children: ReactNode;
};

export default function Link({ href, gatsby, light, children }: LinkProps) {
  const style = light ? styles.linkLight : styles.link;

  if (gatsby) {
    return (
      <GatsbyLink to={href} className={style}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a href={href} className={style}>
      {children}
    </a>
  );
}
