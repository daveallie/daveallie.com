import React, { useState } from 'react';
import * as styles from './styles.module.scss';

type TooltipProps = {
  tooltip: string;
  text: string;
  color?: 'light' | 'ultraLight' | 'normal';
  underline?: boolean;
};

export default function Tooltip({ tooltip, text }: TooltipProps) {
  const [locations, setLocations] = useState({
    pointer: {
      top: 0,
      left: 0,
    },
    tooltip: { top: 0, left: 0 },
  });

  const getPosition = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const docEl = document.documentElement;
    // Get bottom center of text
    const pointer = {
      left: rect.left + rect.width / 2 + docEl.scrollLeft,
      top: rect.bottom + docEl.scrollTop,
    };

    // get element font size
    const fontSize = parseInt(
      window.getComputedStyle(e.currentTarget).fontSize.replace('px', ''),
    );

    // if multi-line text, shift left to be start of line
    if (rect.height > fontSize * 1.5) {
      pointer.left = rect.left + docEl.scrollLeft + 10;
    }

    const width = Math.min(300, docEl.clientWidth - 20);

    const tooltip = {
      left: pointer.left - width / 2,
      top: pointer.top + 5,
      width,
    };

    if (tooltip.left + tooltip.width > docEl.clientWidth - 10) {
      tooltip.left = docEl.clientWidth - 10 - tooltip.width;
    }

    if (tooltip.left < 10) {
      tooltip.left = 10;
    }

    setLocations({ pointer, tooltip });
  };

  console.log(locations);

  return (
    <>
      <span className={styles.link} onMouseEnter={getPosition}>
        {text}
        {locations.tooltip.top !== 0 ? (
          <>
            <span className={styles.tooltipPointer} style={locations.pointer} />
            <span className={styles.tooltip} style={locations.tooltip}>
              {tooltip}
            </span>
          </>
        ) : null}
      </span>
    </>
  );
}
