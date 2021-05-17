import React, { useEffect } from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

export default function Calendly() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={cn('calendly-inline-widget', styles.calendarContainer)}
      data-url="https://calendly.com/meetdaveallie/coffee?hide_landing_page_details=1&hide_gdpr_banner=1"
    />
  );
}
