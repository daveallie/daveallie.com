import React, { Children, ReactNode } from 'react';
import Link from '../Link';
import * as styles from './styles.module.scss';

export default function ContentHeaderAnchorTag({
  textSize,
  children,
}: {
  textSize: string;
  children: ReactNode;
}) {
  const childString = Children.toArray(children)
    .map((c) => c.toString())
    .join(' ');

  const hash = childString
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .slice(0, 100);

  return (
    <div className={styles.link} id={hash}>
      <Link href={`#${hash}`} underline={false}>
        <span className={'material-icons'} style={{ fontSize: textSize }}>
          link
        </span>
      </Link>
    </div>
  );
}
