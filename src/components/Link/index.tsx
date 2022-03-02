import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Link as GatsbyLink } from 'gatsby';
import * as styles from './styles.module.scss';

type LinkProps = {
  href: string;
  color?: 'light' | 'ultraLight' | 'normal';
  underline?: boolean;
  gatsby?: boolean;
  newTab?: boolean;
  children: ReactNode;
};

export default function Link({
  href,
  gatsby,
  underline = true,
  color = 'normal',
  newTab = false,
  children,
}: LinkProps) {
  const linkStyles = cn({
    [styles.linkUltraLight]: color === 'ultraLight',
    [styles.linkLight]: color === 'light',
    [styles.link]: color === 'normal',
    [styles.noUnderline]: !underline,
  });

  if (gatsby && !newTab) {
    return (
      <GatsbyLink to={href} className={linkStyles}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a
      href={href}
      className={linkStyles}
      target={newTab ? '_blank' : undefined}
    >
      {children}
    </a>
  );
}
