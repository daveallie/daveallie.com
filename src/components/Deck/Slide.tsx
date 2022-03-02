import React, {
  Children,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import * as styles from './styles.module.scss';

type SlideConfigProps = {
  bgColor?: string;
  variant?: 'title';
};

export const SlideConfig = (_props: SlideConfigProps) => null;

const useSlideConfig = (
  children: ReactNode
): [Array<ReactNode>, SlideConfigProps] => {
  let childrenArr = Children.toArray(children);
  const configIndex = childrenArr.findIndex((child) => {
    return isValidElement(child) && child.props.mdxType === 'SlideConfig';
  });

  let config: SlideConfigProps = {};
  if (configIndex >= 0) {
    config = (childrenArr[configIndex] as ReactElement).props;
    childrenArr.splice(configIndex, 1);
  }

  return [childrenArr, config];
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

const useSlideStyles = (
  container: HTMLDivElement | null,
  _variant?: string
): CSSProperties => {
  let { width, height } = useWindowSize();

  if (container) {
    width = container.clientWidth;
    height = container.clientHeight;
  }

  let scale = Math.min(width / 1000, height / ((9 / 16) * 1000));
  let left = Math.max(0, width - 1000 * scale) / 2;
  let top = Math.max(0, height - (9 / 16) * 1000 * scale) / 2;

  return {
    position: 'absolute',
    width: '1000px',
    height: `${(9 / 16) * 1000}px`,
    top: `${top}px`,
    left: `${left}px`,
    transform: `scale(${scale})`,
    transformOrigin: '0 0',
    boxSizing: 'border-box',
  };
};

type SlideProps = {
  children: ReactNode;
};

export default function Slide({ children }: SlideProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [childrenArr, config] = useSlideConfig(children);
  const slideStyles = useSlideStyles(container, config.variant);

  return (
    <div
      ref={setContainer}
      className={cn(styles.slideWrapper, {
        [styles[`slideWrapper_${config.variant}`]]: config.variant,
      })}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        background: config.bgColor,
      }}
    >
      <div className={styles.slide} style={slideStyles}>
        {childrenArr}
      </div>
    </div>
  );
}
