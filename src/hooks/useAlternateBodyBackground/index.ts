import useAlternateBodyStyle from '../useAlternateBodyStyle';
import * as styles from './styles.module.scss';

export default function useAlternateBodyBackground(color: 'Hero' | 'Offwhite') {
  console.log(styles);
  // @ts-ignore
  useAlternateBodyStyle(styles[`body_${color}`]);
}
