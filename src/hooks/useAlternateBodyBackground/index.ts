import useAlternateBodyStyle from '~/hooks/useAlternateBodyStyle';
import * as styles from './styles.module.scss';

export default function useAlternateBodyBackground(color: 'Hero' | 'Offwhite') {
  // @ts-ignore
  useAlternateBodyStyle(styles[`bodyOverride_${color}`]);
}
