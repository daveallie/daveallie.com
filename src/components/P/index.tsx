import React, { ReactNode } from 'react';
import ContentBlock from '../ContentBlock';
import Text from '../Text';

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
