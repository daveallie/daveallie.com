import React, { ReactNode } from 'react';
import ContentBlock, { ContentBlockSpace } from '~/components/ContentBlock';
import Text from '~/components/Text';

export default function P({
  spaceBefore,
  spaceAfter,
  children,
}: {
  spaceBefore?: ContentBlockSpace;
  spaceAfter?: ContentBlockSpace;
  children: ReactNode;
}) {
  return (
    <ContentBlock spaceBefore={spaceBefore} spaceAfter={spaceAfter}>
      <Text size="1.2rem">{children}</Text>
    </ContentBlock>
  );
}
