import React from 'react';
import cn from 'classnames';
import * as FileIconsJs from 'file-icons-js';
import { camelCase } from 'lodash';
import * as fileIconJsStyles from './file-icon-js.styles.module.scss';
import * as styles from './styles.module.scss';

export default function FileIcon({ filename }: { filename: string }) {
  return (
    <span
      className={cn(
        styles.icon,
        fileIconJsStyles[camelCase(FileIconsJs.getClass(filename) || '')]
      )}
    />
  );
}
