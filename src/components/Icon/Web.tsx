import React from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

export default function Web({ flex }: { flex?: boolean }) {
  return (
    <div className={cn(styles.container, { [styles.flexContainer]: flex })}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        style={{ width: '100%', height: '100%' }}
      >
        <g transform="translate(128 128) scale(0.72 0.72)">
          <g transform="translate(-175.05 -175.05000000000004) scale(3.89 3.89)">
            <path
              d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 6 C 23.495 6 6 23.495 6 45 s 17.495 39 39 39 s 39 -17.495 39 -39 S 66.505 6 45 6 z"
              transform=" matrix(1 0 0 1 0 0) "
            />
            <path
              d="M 45 90 c -1.657 0 -3 -1.343 -3 -3 V 3 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 84 C 48 88.657 46.657 90 45 90 z"
              transform=" matrix(1 0 0 1 0 0) "
            />
            <path
              d="M 45 90 c -13.892 0 -24.774 -19.767 -24.774 -45 S 31.108 0 45 0 c 13.893 0 24.774 19.767 24.774 45 S 58.893 90 45 90 z M 45 6 C 34.823 6 26.226 23.86 26.226 45 c 0 21.141 8.597 39 18.774 39 s 18.774 -17.859 18.774 -39 C 63.774 23.86 55.177 6 45 6 z"
              transform=" matrix(1 0 0 1 0 0) "
            />
            <path
              d="M 83.935 63.752 H 6.059 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 77.876 c 1.657 0 3 1.343 3 3 S 85.592 63.752 83.935 63.752 z"
              transform=" matrix(1 0 0 1 0 0) "
            />
            <path
              d="M 83.939 32.248 H 6.063 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 77.876 c 1.657 0 3 1.343 3 3 S 85.597 32.248 83.939 32.248 z"
              transform=" matrix(1 0 0 1 0 0) "
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
