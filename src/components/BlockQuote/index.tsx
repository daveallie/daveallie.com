import React, { Children, ReactElement, ReactNode } from 'react';
import Text from '../Text';
import ContentBlock from '../ContentBlock';
import * as styles from './styles.module.scss';

type BlockQuoteProps = {
  large: boolean;
  children: ReactNode;
};

export default function BlockQuote({ large, children }: BlockQuoteProps) {
  return (
    <ContentBlock>
      <Text italic size={large ? '1.9rem' : '1.2rem'}>
        <div className={styles.blockquote}>{children}</div>
      </Text>
    </ContentBlock>
  );
}

export function BlockQuoteMDXWrapper({ children, ...rest }: BlockQuoteProps) {
  if (Children.count(children) === 1) {
    children = (Children.only(children) as ReactElement).props.children;
  }

  return <BlockQuote {...rest} children={children} />;
}
