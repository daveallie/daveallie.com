import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as styles from './styles.module.scss';

type SparkleProps = {
  color: string;
  pos: number;
  xMove: number;
  yMove: number;
  rotation: number;
  inFront: boolean;
  size?: number;
};

const useRandomInterval = (
  callback: () => void,
  minDelay: number,
  maxDelay: number
) => {
  const timeoutId = useRef<number | null>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleTick = () => {
      const nextTickAt =
        minDelay + Math.floor((maxDelay - minDelay) * Math.random());

      timeoutId.current = window.setTimeout(() => {
        savedCallback.current();
        handleTick();
      }, nextTickAt);
    };

    handleTick();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [minDelay, maxDelay]);
};

const generateSparkle = () => {
  return {
    color: 'hsl(' + Math.floor(20 + 30 * Math.random()) + ', 100%, 50%)',
    pos: 20 + Math.round(60 * Math.random()),
    xMove: (Math.random() > 0.5 ? 1 : -1) * (0.5 + 1.5 * Math.random()),
    yMove: -1 - 1 * Math.random(),
    rotation:
      (Math.random() > 0.5 ? 1 : -1) * Math.round(60 + 300 * Math.random()),
    inFront: Math.random() < 0.5,
    size: 0.5 + 0.7 * Math.random(),
    createdAt: Date.now(),
  };
};

const Sparkle = ({
  color,
  pos,
  xMove,
  yMove,
  rotation,
  inFront,
  size = 1,
}: SparkleProps) => {
  return (
    <div
      className={styles.sparkleContainerContainerC}
      style={
        {
          width: `${size}rem`,
          height: `${size}rem`,
          left: `${pos}%`,
          zIndex: inFront ? 2 : -1,
          '--x-distance': `${xMove}rem`,
          '--y-distance': `${yMove}rem`,
          '--rotation': `${rotation}deg`,
        } as CSSProperties
      }
    >
      <div className={styles.sparkleContainerContainer}>
        <div className={styles.sparkleContainer}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 212 212"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.sparkle}
          >
            <g transform="matrix(1,0,0,1,-667.725,-83.0293)">
              <g transform="matrix(1,0,0,1,-262.335,-575.465)">
                <g transform="matrix(1,0,0,1,89.299,581.978)">
                  <path
                    d="M945.53,77.2C945.675,76.79 946.063,76.516 946.498,76.516C946.934,76.516 947.322,76.79 947.467,77.2L969.739,139.907C971.303,144.312 973.83,148.312 977.135,151.617C980.44,154.922 984.44,157.448 988.844,159.013L1051.55,181.284C1051.96,181.43 1052.24,181.818 1052.24,182.253C1052.24,182.688 1051.96,183.076 1051.55,183.222L988.844,205.493C984.44,207.057 980.44,209.584 977.135,212.889C973.83,216.194 971.303,220.194 969.739,224.599L947.467,287.306C947.322,287.716 946.934,287.99 946.498,287.99C946.063,287.99 945.675,287.716 945.53,287.306L923.258,224.599C921.694,220.194 919.167,216.194 915.862,212.889C912.557,209.584 908.557,207.057 904.153,205.493L841.445,183.222C841.035,183.076 840.761,182.688 840.761,182.253C840.761,181.818 841.035,181.43 841.445,181.284L904.153,159.013C908.557,157.448 912.557,154.922 915.862,151.617C919.167,148.312 921.694,144.312 923.258,139.907L945.53,77.2Z"
                    fill={color}
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function SparkleText({ children }: { children: ReactNode }) {
  const [sparkles, setSparkles] = useState<
    Array<SparkleProps & { createdAt: number }>
  >([]);

  useRandomInterval(
    () => {
      const now = Date.now();

      const nextSparkles = sparkles.filter((sparkle) => {
        const delta = now - sparkle.createdAt;
        return delta < 1000;
      });

      setSparkles([...nextSparkles, generateSparkle()]);
    },
    100,
    400
  );

  return (
    <span style={{ position: 'relative' }}>
      <b>{children}</b>
      {sparkles.map(({ createdAt, ...sparkleProps }) => (
        <Sparkle key={createdAt} {...sparkleProps} />
      ))}
    </span>
  );
}
