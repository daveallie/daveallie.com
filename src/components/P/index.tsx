import React, { ReactNode } from 'react';
import Text from '../Text';
import ContentBlock from '../ContentBlock';

export default function P({ children }: { children: ReactNode }) {
  return (
    <ContentBlock>
      <Text size="1.2rem">{children}</Text>
    </ContentBlock>
  );
}
