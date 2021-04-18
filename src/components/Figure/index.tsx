import React, { Children, ReactElement, ReactNode } from 'react';
import * as styles from './styles.module.scss';

type FigureProps = {
  children: ReactNode;
  caption?: string;
};

const removeWrappingP = (children: ReactNode) => {
  if (Children.count(children) !== 1) {
    return children;
  }

  const onlyChild = Children.only(children)!! as ReactElement;
  if (
    // @ts-ignore
    onlyChild.type.displayName === 'MDXCreateElement' &&
    onlyChild.props.originalType === 'p'
  ) {
    return <>{onlyChild.props.children}</>;
  }

  return children;
};

export default function Figure(props: FigureProps) {
  return (
    <figure>
      <div className={styles.figureGrid}>{removeWrappingP(props.children)}</div>
      {props.caption && <figcaption>{props.caption}</figcaption>}
    </figure>
  );
}
