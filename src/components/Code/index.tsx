import React, { ReactNode } from 'react';
import cn from 'classnames';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ContentBlock from '../ContentBlock';
import Text from '../Text';
import * as styles from './styles.module.scss';

export default function Code({
  language,
  filename,
  showLineNumbers = false,
  children,
}: {
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  children: ReactNode;
}) {
  return (
    <ContentBlock>
      <Text container="div" size="1rem">
        <div
          className={cn(styles.container, { [styles.withFilename]: filename })}
        >
          {filename && <div className={styles.filename}>{filename}</div>}
          <SyntaxHighlighter
            showLineNumbers={showLineNumbers}
            language={language}
            style={githubGist}
          >
            {children}
          </SyntaxHighlighter>
        </div>
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
  let trimmedContent = children?.toString()?.trimEnd();
  const filenameMatch = trimmedContent?.match(
    /^--filename:([^\n]+)--\n((?:.|[\n\r])*)/
  );
  const filename = filenameMatch ? filenameMatch[1] : undefined;
  trimmedContent = filenameMatch ? filenameMatch[2] : trimmedContent;

  const lineNumbersMatch = trimmedContent?.match(
    /^--linenumbers:([^\n]+)--\n((?:.|[\n\r])*)/
  );
  const lineNumbers = lineNumbersMatch
    ? lineNumbersMatch[1] === 'true'
    : undefined;
  trimmedContent = lineNumbersMatch ? lineNumbersMatch[2] : trimmedContent;

  return (
    <Code
      language={className?.replace('language-', '')}
      filename={filename}
      showLineNumbers={lineNumbers}
      children={trimmedContent}
    />
  );
}
