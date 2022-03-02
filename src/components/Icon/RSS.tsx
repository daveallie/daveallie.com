import React from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

export default function RSS({
  accentColor = 'light',
}: {
  accentColor?: 'dark' | 'light';
}) {
  const accentStyles = cn(styles.noStroke, {
    [styles.forceDarkFill]: accentColor === 'dark',
    [styles.forceLightFill]: accentColor === 'light',
  });

  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 8"
        style={{ width: '100%', height: '100%' }}
      >
        <title>RSS feed icon</title>

        <rect className={styles.noStroke} width="8" height="8" rx="1.5" />
        <circle className={accentStyles} cx="2" cy="6" r="1" />
        <path
          className={accentStyles}
          d="m 1,4 a 3,3 0 0 1 3,3 h 1 a 4,4 0 0 0 -4,-4 z"
        />
        <path
          className={accentStyles}
          d="m 1,2 a 5,5 0 0 1 5,5 h 1 a 6,6 0 0 0 -6,-6 z"
        />
      </svg>
    </div>
  );
}
