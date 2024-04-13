import React, { Children, isValidElement, ReactNode } from 'react';
import ContentBlock from '~/components/ContentBlock';
import Text from '~/components/Text';
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
  const filteredChildren = Children.toArray(children).filter(
    (child) => child !== '\n',
  );
  const [firstFilteredChild] = filteredChildren;
  if (filteredChildren.length === 1 && isValidElement(firstFilteredChild)) {
    children = firstFilteredChild.props.children;
  }

  return <BlockQuote {...rest} children={children} />;
}
