import React from 'react';
import Github from '~/components/Icon/Github';
import LinkedIn from '~/components/Icon/LinkedIn';
import Web from '~/components/Icon/Web';
import Link from '~/components/Link';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

export default function TitleSlide({
  title,
  subtitle,
  showSocials,
}: {
  title: string;
  subtitle?: string;
  showSocials?: boolean;
}) {
  return (
    <div className={styles.slide}>
      <Text container="h1" color="headingLight" size="3rem" weight={600}>
        {title}
      </Text>
      {subtitle ? (
        <Text color="subheadingLight" container="div" size="1.5rem">
          {subtitle}
        </Text>
      ) : null}
      {showSocials ? (
        <Text
          container="div"
          color="headingLight"
          className={styles.socialsContainer}
        >
          <Link color="light" href={'https://github.com/daveallie'} newTab>
            <div className={styles.socialRow}>
              <Github flex />
              <span className={styles.socialText}>daveallie</span>
            </div>
          </Link>
          <Link color="light" href={'https://linkedin.com/in/daveallie'} newTab>
            <div className={styles.socialRow}>
              <LinkedIn flex />
              <span className={styles.socialText}>in/daveallie</span>
            </div>
          </Link>
          <Link color="light" href={'https://daveallie.com'} newTab>
            <div className={styles.socialRow}>
              <Web flex />
              <span className={styles.socialText}>daveallie.com</span>
            </div>
          </Link>
        </Text>
      ) : null}
    </div>
  );
}
