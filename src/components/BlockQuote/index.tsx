import React, { Children, ReactElement, ReactNode } from 'react';
import Text from '../Text';
import ContentBlock from '../ContentBlock';
import * as styles from './styles.module.scss';

export default function BlockQuote({
  large,
  children,
}: {
  large: boolean;
  children: ReactNode;
}) {
  if (Children.count(children) === 1) {
    children = (Children.only(children) as ReactElement).props.children;
  }

  return (
    <ContentBlock>
      <Text italic size={large ? '1.9rem' : '1.2rem'}>
        <div className={styles.blockquote}>{children}</div>
      </Text>
    </ContentBlock>
  );
}
