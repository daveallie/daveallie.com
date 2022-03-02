import React, { Children, isValidElement, ReactNode, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import DeckController from './DeckController';

const useSplitSlides = (children: ReactNode) =>
  useMemo(() => {
    const childrenArr = Children.toArray(children);
    const hrIndexes: Array<number> = [];
    const slides: Array<ReactNode> = [];

    childrenArr.forEach((child, index) => {
      if (isValidElement(child) && child.props.mdxType === 'hr') {
        hrIndexes.push(index);
      }
    });

    let previousSplit = 0;
    hrIndexes.forEach((index) => {
      slides.push([...childrenArr.slice(previousSplit, index)]);
      previousSplit = index + 1;
    });

    slides.push([...childrenArr.slice(previousSplit)]);

    return slides;
  }, [children]);

export default function DeckWrapper({
  slug,
  navDisabled,
  children,
}: {
  slug: string;
  navDisabled?: boolean;
  children: ReactNode;
}) {
  const slides = useSplitSlides(children);
  return (
    <BrowserRouter basename={navDisabled ? '/' : slug}>
      <DeckController slides={slides} navDisabled={navDisabled} />
    </BrowserRouter>
  );
}
