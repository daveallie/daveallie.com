import { useCallback, useEffect, useState } from 'react';

export default function useScrollLocking(
  initialScrollLocked: boolean
): [number, (scrollLocked: boolean) => void] {
  const [scrollY, setScrollY] = useState(0);
  const [isScrollLocked, setScrollLocked] = useState(initialScrollLocked);

  const onScroll = useCallback(() => {
    if (isScrollLocked) {
      window.scrollTo(0, 0);
    } else {
      setScrollY(window.scrollY);
    }
  }, [isScrollLocked, setScrollY]);

  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isScrollLocked]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return [scrollY, setScrollLocked];
}
