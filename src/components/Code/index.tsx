import React, { ReactNode } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import cn from 'classnames';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ContentBlock from '../ContentBlock';
import Text from '../Text';
import * as styles from './styles.module.scss';

interface CodeTagProps extends React.HTMLAttributes<HTMLElement> {
  'data-filename'?: string;
}

export default function Code({
  language,
  filename,
  children,
}: {
  language?: string;
  filename?: string;
  children: ReactNode;
}) {
  return (
    <ContentBlock>
      <Text container="div" size="1rem">
        <SyntaxHighlighter
          showLineNumbers
          language={language}
          style={githubGist}
          codeTagProps={
            {
              className: cn(styles.code, { [styles.withFilename]: filename }),
              'data-filename': filename,
            } as CodeTagProps
          }
        >
          {children}
        </SyntaxHighlighter>
      </Text>
    </ContentBlock>
  );
}

export function CodeMDXWrapper({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const trimmedContent = children?.toString()?.trim();
  const match = trimmedContent?.match(
    /^--filename:([^\n]+)--\n((?:.|[\n\r])*)/
  );

  return (
    <Code
      language={className?.replace('language-', '')}
      filename={match ? match[1] : undefined}
      children={match ? match[2] : trimmedContent}
    />
  );
}
