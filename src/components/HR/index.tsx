import React from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

type HRProps = {
  width?: 'normal' | 'wide';
  spaceAfter?: 'normal' | 'half' | 'none';
  spaceBefore?: 'normal' | 'half' | 'none';
};

export default function HR({
  width = 'normal',
  spaceAfter = 'normal',
  spaceBefore = 'normal',
}: HRProps) {
  return (
    <hr
      className={cn(styles.hr, {
        [styles[`spaceAfter_${spaceAfter}`]]: spaceAfter !== 'normal',
        [styles[`spaceBefore_${spaceBefore}`]]: spaceBefore !== 'normal',
        [styles.wide]: width === 'wide',
      })}
    />
  );
}
