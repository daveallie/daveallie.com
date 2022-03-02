import React, { ReactNode } from 'react';
import P from '~/components/P';

function Ul({ children }: { children: ReactNode }) {
  return (
    <P spaceBefore="none">
      <ul>{children}</ul>
    </P>
  );
}

function Ol({ children }: { children: ReactNode }) {
  return (
    <P spaceBefore="none">
      <ol>{children}</ol>
    </P>
  );
}

export { Ul, Ol };
