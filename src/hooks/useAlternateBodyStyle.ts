import { useEffect } from 'react';
import cn from 'classnames';

export default function useAlternateBodyStyle(className: string) {
  useEffect(() => {
    document.body.className = cn(document.body.className, className);
    return () => {
      document.body.className = cn(
        document.body.className.split(' ').filter((c) => c !== className)
      );
    };
  }, []);
}
