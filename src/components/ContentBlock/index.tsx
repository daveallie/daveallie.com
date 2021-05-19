import React, { ReactNode } from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

export type ContentBlockSpace = 'normal' | 'half' | 'none';

type ContentBlockProps = {
  spaceAfter?: ContentBlockSpace;
  spaceBefore?: ContentBlockSpace;
  children: ReactNode;
};

export default function ContentBlock({
  spaceAfter = 'normal',
  spaceBefore = 'normal',
  children,
}: ContentBlockProps) {
  return (
    <div
      className={cn(styles.container, {
        [styles[`spaceAfter_${spaceAfter}`]]: spaceAfter !== 'normal',
        [styles[`spaceBefore_${spaceBefore}`]]: spaceBefore !== 'normal',
      })}
    >
      {children}
    </div>
  );
}
