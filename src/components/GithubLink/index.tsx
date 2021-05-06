import React from 'react';
import Github from '~/components/Icon/Github';
import Link from '~/components/Link';
import * as styles from './styles.module.scss';

type GithubLinkProps = {
  user: string;
  repo: string;
  color?: 'light' | 'ultraLight' | 'normal';
  underline?: boolean;
};

export default function GithubLink({
  user,
  repo,
  color,
  underline,
}: GithubLinkProps) {
  return (
    <Link
      href={`https://github.com/${user}/${repo}`}
      color={color}
      underline={underline}
    >
      <span className={styles.noWrap}>
        <Github /> daveallie
      </span>
      /daveallie.com
    </Link>
  );
}
