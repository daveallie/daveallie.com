import React, { Children, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { chunk } from 'lodash';
import * as styles from './styles.module.scss';

type FigureProps = {
  grid?: boolean;
  caption?: string;
  children: ReactNode;
};

const removeWrappingP = (children: ReactNode) => {
  if (Children.count(children) !== 1) {
    return Children.toArray(children);
  }

  const onlyChild = Children.only(children)!! as ReactElement;
  if (
    // @ts-ignore
    onlyChild.type.displayName === 'MDXCreateElement' &&
    onlyChild.props.originalType === 'p'
  ) {
    return Children.toArray(onlyChild.props.children).filter((c) => c !== '\n');
  }

  return Children.toArray(children);
};

export default function Figure(props: FigureProps) {
  const children = removeWrappingP(props.children);
  const childrenChunks = chunk(children, props.grid ? 2 : 1);

  return (
    <figure>
      <div
        className={cn(
          styles.container,
          props.grid ? styles.grid : styles.notGrid
        )}
      >
        {childrenChunks.map((cc) => (
          <div className={styles.row}>{cc}</div>
        ))}
      </div>
      {props.caption && (
        <figcaption className={styles.caption}>{props.caption}</figcaption>
      )}
    </figure>
  );
}