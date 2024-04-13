import { createContext, useContext } from 'react';
import { flatten } from 'lodash';

type DeckContextType = {
  deckLength: number;
  routes: Array<Array<number>>;
  registerStep: (slideIndex: number, stepIndex: number) => void;
};

const DeckContext = createContext<DeckContextType>({
  deckLength: 1,
  routes: [[0]],
  registerStep: () => {},
});

export const useDeckContext = () => useContext(DeckContext);

export const useDeckRoutes = () =>
  flatten(
    useDeckContext().routes.map((slideRoutes, i) =>
      slideRoutes.map(
        (step) => `/${i}/${step}`.replace(/(?:\/0)+$/, '') || '/',
      ),
    ),
  );

export default DeckContext;
