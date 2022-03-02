import React, { Children, ReactNode } from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

type SplitOptions = {
  noGrow?: boolean;
  bgColor?: string;
};

type SplitProps = {
  direction: 'row' | 'column';
  config?: Array<SplitOptions>;
  children: ReactNode;
};

export default function Split({
  direction,
  config = [],
  children,
}: SplitProps) {
  return (
    <div className={styles[`split_${direction}`]}>
      {Children.toArray(children).map((child, index) => (
        <div
          key={index}
          className={cn({
            [styles.splitChild]: !config[index]?.noGrow,
            [styles.splitChild_noGrow]: config[index]?.noGrow,
          })}
          style={{
            backgroundColor: config[index]?.bgColor,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
