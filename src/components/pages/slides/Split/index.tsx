import React, { Children, CSSProperties, ReactNode } from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

type SplitOptions = {
  noGrow?: boolean;
  bgColor?: string;
  bgOverflow?: boolean;
  bgOverflowZIndex?: number;
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
  const childrenArray = Children.toArray(children);
  const numChildren = childrenArray.length;

  return (
    <div className={styles[`split_${direction}`]}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn({
            [styles.splitChild]: !config[index]?.noGrow,
            [styles.splitChild_noGrow]: config[index]?.noGrow,
            [styles.overflow_rowLeft]:
              direction === 'row' &&
              index === 0 &&
              config[index]?.bgColor &&
              config[index]?.bgOverflow,
            [styles.overflow_rowMiddle]:
              direction === 'row' &&
              index > 0 &&
              index < numChildren - 1 &&
              config[index]?.bgColor &&
              config[index]?.bgOverflow,
            [styles.overflow_rowRight]:
              direction === 'row' &&
              index === numChildren - 1 &&
              config[index]?.bgColor &&
              config[index]?.bgOverflow,
            [styles.overflow_columnTop]:
              direction === 'column' &&
              index === 0 &&
              config[index]?.bgColor &&
              config[index]?.bgOverflow,
            [styles.overflow_columnMiddle]:
              direction === 'column' &&
              index > 0 &&
              index < numChildren - 1 &&
              config[index]?.bgColor &&
              config[index]?.bgOverflow,
            [styles.overflow_columnBottom]:
              direction === 'column' &&
              index === numChildren - 1 &&
              config[index]?.bgColor &&
              config[index]?.bgOverflow,
          })}
          style={
            {
              '--bg-color': config[index]?.bgColor,
              '--bg-overflow-z-index': config[index]?.bgOverflowZIndex || -5,
            } as CSSProperties
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
