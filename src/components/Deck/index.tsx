import React, { ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import AlertBox from '~/components/AlertBox';
import { BlockQuoteMDXWrapper } from '~/components/BlockQuote';
import { CodeMDXWrapper } from '~/components/Code';
import { H1, H2, H3 } from '~/components/ContentHeader';
import { FigureMDXWrapper } from '~/components/Figure';
import InlineCode from '~/components/InlineCode';
import Link from '~/components/Link';
import { Ol, Ul } from '~/components/List';
import P from '~/components/P';
import Table from '~/components/Table';
import Text from '~/components/Text';
import Split from '~/components/pages/slides/Split';
import Step from '~/components/pages/slides/Step';
import TitleSlide from '~/components/pages/slides/TitleSlide';
import DeckWrapper from './DeckWrapper';
import { SlideConfig } from './Slide';

const components = {
  wrapper: DeckWrapper,
  SlideConfig,
  Split,
  Step,
  TitleSlide,
  a: Link,
  blockquote: BlockQuoteMDXWrapper,
  code: CodeMDXWrapper,
  inlineCode: InlineCode,
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  table: Table,
  ul: Ul,
  ol: Ol,
  BlockQuote: BlockQuoteMDXWrapper,
  Figure: FigureMDXWrapper,
  AlertBox,
  Link,
  Text,
};

export default function Deck({ children }: { children: ReactNode }) {
  return (
    // @ts-ignore
    <MDXProvider components={components}>
      <Text container="div" color="dark">
        {children}
      </Text>
    </MDXProvider>
  );
}
