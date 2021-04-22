import React, { ReactNode } from 'react';
import Text from '../Text';
import ContentBlock from '../ContentBlock';

export default function P({
  negTopMargin,
  children,
}: {
  negTopMargin: boolean;
  children: ReactNode;
}) {
  return (
    <ContentBlock negTopMargin={negTopMargin}>
      <Text size="1.2rem">{children}</Text>
    </ContentBlock>
  );
}
