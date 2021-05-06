import React from 'react';
import cn from 'classnames';
import Github from '../Icon/Github';
import LinkedIn from '../Icon/LinkedIn';
import RSS from '../Icon/RSS';
import Link from '../Link';
import Text from '../Text';
import * as styles from './styles.module.scss';

type PageFooterProps = {
  includeHomeLink?: boolean;
  fixed?: boolean;
};

export default function PageFooter({
  includeHomeLink = true,
  fixed = false,
}: PageFooterProps) {
  const includeRssLink = process.env.SUBSITE === 'blog';

  return (
    <div className={cn(styles.footer, { [styles.fixed]: fixed })}>
      <div className={styles.footerItem}>
        {includeHomeLink && (
          <Link color="ultraLight" href="/" gatsby>
            <Text>Back to Home</Text>
          </Link>
        )}
      </div>

      <div className={styles.socialLinks}>
        {includeRssLink && (
          <div className={styles.footerItem}>
            <Link color="ultraLight" href="/rss.xml">
              <RSS accentColor="dark" />
            </Link>
          </div>
        )}
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
