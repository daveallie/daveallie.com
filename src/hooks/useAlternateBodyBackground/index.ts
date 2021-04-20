import useAlternateBodyStyle from '../useAlternateBodyStyle';
import * as styles from './styles.module.scss';

export default function useAlternateBodyBackground(color: 'Hero' | 'Offwhite') {
  // @ts-ignore
  useAlternateBodyStyle(styles[`body_${color}`]);
}
