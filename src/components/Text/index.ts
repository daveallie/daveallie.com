import { createElement, CSSProperties, ReactNode } from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

const WEIGHT_MAP = {
  XLight: 200,
  Light: 300,
  Regular: 400,
  SemiBold: 500,
  Bold: 600,
  Black: 700,
  Ultra: 800,
};

type TextProps = {
  container?: 'div' | 'span';
  weight?:
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 'XLight'
    | 'Light'
    | 'Regular'
    | 'SemiBold'
    | 'Bold'
    | 'Black'
    | 'Ultra';
  color?: 'headingLight' | 'subheadingLight' | 'dark';
  size?: string;
  italic?: boolean;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
};

export default function Text({
  container = 'span',
  weight,
  color,
  size,
  italic,
  style = {},
  className = '',
  children,
}: TextProps) {
  const numberWeight = weight
    ? typeof weight === 'number'
      ? weight
      : WEIGHT_MAP[weight]
    : null;

  const classes = cn(
    styles.amsiFont,
    {
      [styles.normal]: italic != null && !italic,
      [styles.italic]: italic != null && italic,
      // @ts-ignore
      [styles[`weight_${numberWeight}`]]: numberWeight != null,
      // @ts-ignore
      [styles[`color_${color}`]]: color != null,
    },
    className
  );

  return createElement(
    container,
    {
      className: classes,
      style: { ...(size != null ? { fontSize: size } : {}), ...style },
    },
    children
  );
}
