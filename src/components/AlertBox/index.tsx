import React, { ReactNode } from 'react';
import cn from 'classnames';
import ContentBlock from '~/components/ContentBlock';
import Text from '~/components/Text';
import * as styles from './styles.module.scss';

type AlertType = 'info' | 'warning';

const getIcon = (type: AlertType) => {
  switch (type) {
    case 'info':
      return 'info_outline';
    case 'warning':
      return 'error_outline';
  }
};

export default function AlertBox({
  type,
  children,
}: {
  type: AlertType;
  children: ReactNode;
}) {
  return (
    <ContentBlock>
      <Text>
        <div className={cn(styles.alertContainer, styles[type])}>
          <div className={cn(styles.alertIcon, styles[type])}>
            <span className="material-icons">{getIcon(type)}</span>
          </div>
          {children}
        </div>
      </Text>
    </ContentBlock>
  );
}
