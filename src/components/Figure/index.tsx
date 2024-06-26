import React, { Children, ReactNode } from 'react';
import cn from 'classnames';
import { chunk } from 'lodash';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

type FigureProps = {
  grid?: boolean;
  caption?: string;
  children: ReactNode;
};

export default function Figure(props: FigureProps) {
  const childrenChunks = chunk(
    Children.toArray(props.children),
    props.grid ? 2 : 1,
  );

  return (
    <figure className={styles.figure}>
      <div
        className={cn(
          styles.container,
          props.grid ? styles.grid : styles.notGrid,
        )}
      >
        {childrenChunks.map((cc, index) => (
          <div className={styles.row} key={index}>
            {cc}
          </div>
        ))}
      </div>
      {props.caption && (
        <figcaption className={styles.caption}>
          <Text weight={300} size="0.9rem" color="accent">
            {props.caption}
          </Text>
        </figcaption>
      )}
    </figure>
  );
}

export function FigureMDXWrapper({ children, ...rest }: FigureProps) {
  return (
    <Figure
      {...rest}
      children={Children.toArray(children).filter((c) => c !== '\n')}
    />
  );
}
