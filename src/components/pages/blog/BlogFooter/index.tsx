import React from 'react';
import Link from '../../../Link';
import Text from '../../../Text';
import Github from '../../../Icon/Github';
import LinkedIn from '../../../Icon/LinkedIn';
import * as styles from './styles.module.scss';

export default function BlogFooter() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerItem}>
        <Link color="ultraLight" href="/" gatsby>
          <Text>Back to Home</Text>
        </Link>
      </div>

      <div className={styles.socialLinks}>
        <div className={styles.footerItem}>
          <Link
            color="ultraLight"
            href="https://www.linkedin.com/in/daveallie/"
          >
            <LinkedIn />
          </Link>
        </div>
        <div className={styles.footerItem}>
          <Link color="ultraLight" href="https://github.com/daveallie">
            <Github />
          </Link>
        </div>
      </div>
    </div>
  );
}
