import React, { ReactNode, useCallback, useState } from 'react';
import { uniq } from 'lodash';
import { Route, Routes } from 'react-router-dom';
import DeckContext from './DeckContext';
import DeckNavigation from './DeckNavigation';
import Slide from './Slide';

export default function DeckController({
  slides,
  navDisabled,
}: {
  slides: Array<ReactNode>;
  navDisabled?: boolean;
}) {
  const [routes, setRoutes] = useState(slides.map((_s) => [0]));

  const registerStep = useCallback(
    (slideIndex: number, stepIndex: number) => {
      if (!routes[slideIndex]) {
        return;
      }

      if (routes[slideIndex].includes(stepIndex)) {
        return;
      }

      setRoutes([
        ...routes.slice(0, slideIndex),
        uniq([...routes[slideIndex], stepIndex].sort()),
        ...routes.slice(slideIndex + 1),
      ]);
    },
    [routes]
  );

  if (navDisabled) {
    return (
      <DeckContext.Provider
        value={{ deckLength: slides.length, routes, registerStep }}
      >
        <Slide>{slides[0]}</Slide>
      </DeckContext.Provider>
    );
  }

  return (
    <DeckContext.Provider
      value={{ deckLength: slides.length, routes, registerStep }}
    >
      <DeckNavigation>
        <Routes>
          <Route index element={<Slide>{slides[0]}</Slide>} />
          {slides.map((slide, i) => (
            <Route key={i} path={`/${i}`} element={<Slide>{slide}</Slide>}>
              <Route path=":step" element={<Slide>{slide}</Slide>} />
            </Route>
          ))}
        </Routes>
      </DeckNavigation>
    </DeckContext.Provider>
  );
}
