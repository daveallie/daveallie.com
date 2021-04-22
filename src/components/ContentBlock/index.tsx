import React, { ReactNode } from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

export default function ContentBlock({
  negTopMargin,
  children,
}: {
  negTopMargin: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(styles.container, { [styles.negTopMargin]: negTopMargin })}
    >
      {children}
    </div>
  );
}
