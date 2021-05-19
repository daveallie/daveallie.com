import React, { ReactNode } from 'react';
import cn from 'classnames';
import ContentBlock from '~/components/ContentBlock';
import Text, { TextColor, TextWeight } from '~/components/Text';
import ContentHeaderAnchorTag from './ContentHeaderAnchorTag';
import * as styles from './styles.module.scss';

type ContentHeaderContainerProps = {
  container: keyof HTMLElementTagNameMap;
  spaceBefore?: 'none';
  textSize: string;
  textWeight: TextWeight;
  textClassName: string;
  textColor?: TextColor;
  anchorTag?: boolean;
  children: ReactNode;
};

export default function ContentHeaderContainer({
  container,
  spaceBefore,
  textSize,
  textWeight,
  textClassName,
  textColor,
  anchorTag = true,
  children,
}: ContentHeaderContainerProps) {
  return (
    <ContentBlock spaceAfter="half">
      <div className={styles.container}>
        <Text
          color={textColor}
          size={textSize}
          weight={textWeight}
          className={cn(textClassName, {
            [styles.spaceBeforeNone]: spaceBefore === 'none',
          })}
          container={container}
        >
          {anchorTag && (
            <ContentHeaderAnchorTag textSize={textSize} children={children} />
          )}
          {children}
        </Text>
      </div>
    </ContentBlock>
  );
}
