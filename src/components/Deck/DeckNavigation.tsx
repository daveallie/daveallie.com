import React, { ReactNode, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import { useDeckRoutes } from './DeckContext';
import * as styles from './styles.module.scss';

export default function DeckNavigation({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const deckRoutes = useDeckRoutes();
  const { pathname } = useLocation();

  const currRouteIndex = deckRoutes.indexOf(pathname);

  const updatePath = useCallback(
    (newPath: string) => {
      if (pathname !== newPath) {
        navigate(newPath);
      }
    },
    [pathname, navigate]
  );

  const prevRoute = useCallback(() => {
    updatePath(deckRoutes[Math.max(currRouteIndex - 1, 0)]);
  }, [updatePath, deckRoutes, currRouteIndex]);

  const nextRoute = useCallback(() => {
    updatePath(deckRoutes[Math.min(currRouteIndex + 1, deckRoutes.length - 1)]);
  }, [updatePath, deckRoutes, currRouteIndex]);

  const touchHandlers = useSwipeable({
    onSwipedLeft: nextRoute,
    onSwipedUp: nextRoute,
    onSwipedRight: prevRoute,
    onSwipedDown: prevRoute,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey) return;
      if (e.ctrlKey) return;

      if (e.shiftKey) {
        switch (e.code) {
          case 'Space':
            e.preventDefault();
            prevRoute();
            break;
          default:
            break;
        }
      } else {
        switch (e.code) {
          case 'Space':
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            nextRoute();
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            prevRoute();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevRoute, nextRoute]);

  return (
    <div {...touchHandlers} className={styles.slideTouchTarget}>
      {children}
    </div>
  );
}
