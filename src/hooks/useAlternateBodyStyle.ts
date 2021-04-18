import { useEffect } from 'react';
import cn from 'classnames';

export default function useAlternateBodyStyle(className: string) {
  useEffect(() => {
    console.log(`adding ${className}`);
    document.body.className = cn(document.body.className, className);
    return () => {
      console.log(`removing ${className}`);
      document.body.className = cn(
        document.body.className.split(' ').filter((c) => c !== className)
      );
    };
  }, []);
}
