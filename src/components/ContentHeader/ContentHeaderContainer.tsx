import React, { ReactNode } from 'react';
import ContentBlock from '~/components/ContentBlock';
import Text, { TextColor, TextWeight } from '~/components/Text';
import ContentHeaderAnchorTag from './ContentHeaderAnchorTag';
import * as styles from './styles.module.scss';

type ContentHeaderContainerProps = {
  textSize: string;
  textWeight: TextWeight;
  textClassName: string;
  textColor?: TextColor;
  anchorTag?: boolean;
  children: ReactNode;
};

export default function ContentHeaderContainer({
  textSize,
  textWeight,
  textClassName,
  textColor,
  anchorTag = true,
  children,
}: ContentHeaderContainerProps) {
  return (
    <ContentBlock>
      <div className={styles.container}>
        <Text
          color={textColor}
          size={textSize}
          weight={textWeight}
          className={textClassName}
          container="div"
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
