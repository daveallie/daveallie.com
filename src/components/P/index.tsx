import React, { ReactNode } from 'react';
import ContentBlock from '~/components/ContentBlock';
import Text from '~/components/Text';

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
