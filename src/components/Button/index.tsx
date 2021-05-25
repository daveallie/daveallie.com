import React, { ReactNode } from 'react';
import cn from 'classnames';
import { noop } from 'lodash';
import * as styles from './styles.module.scss';

type ButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
};

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, { [styles.disabled]: disabled })}
      onClick={disabled ? noop : onClick}
    >
      {children}
    </button>
  );
}
