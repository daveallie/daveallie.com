import { useEffect } from 'react';

export default function usePageTracking() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      (async () => await fetch('/api/visit'))();
    }
  }, []);
}
