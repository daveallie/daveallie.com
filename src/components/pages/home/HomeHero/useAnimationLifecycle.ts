import { useCallback, useEffect, useState } from 'react';
import useScrollLocking from '../../../../hooks/useScrollLocking';

export enum AnimationState {
  notStarted,
  started,
  finished,
}

export default function useAnimationLifecycle(
  initialAnimationState: AnimationState
) {
  const [scrollY, setScrollLocked] = useScrollLocking(true);
  const [animationState, setAnimationState] = useState(initialAnimationState);
  const [showClickPrompt, setShowClickPrompt] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);

  useEffect(() => {
    setScrollLocked(animationState !== AnimationState.finished);
  }, [animationState, setScrollLocked]);

  const startAnimation = useCallback(() => {
    if (animationState === AnimationState.notStarted) {
      setAnimationState(AnimationState.started);
      setShowClickPrompt(false);
      setTimeout(() => setAnimationState(AnimationState.finished), 3800);
    }
    // Note: intentionally excluded setAnimationState and setShowClickPrompt from deps
    // Don't want this effect to re-run when those change, only on animation state
  }, [animationState]);

  // Show the 'click' prompt 1.5 seconds after idle in not started state
  useEffect(() => {
    if (animationState === AnimationState.notStarted) {
      const timeout = setTimeout(() => setShowClickPrompt(true), 1500);
      return () => clearTimeout(timeout);
    }
  }, [animationState]);

  // Show the 'scroll' prompt 1 second after idle in finished
  // clear once scrolling
  useEffect(() => {
    if (
      animationState === AnimationState.finished &&
      scrollY === 0 &&
      !showScrollPrompt
    ) {
      const timeout = setTimeout(() => setShowScrollPrompt(true), 1000);
      return () => clearTimeout(timeout);
    }

    if (scrollY > 0) {
      setShowScrollPrompt(false);
    }
  }, [animationState, scrollY, showScrollPrompt]);

  useEffect(() => {
    setScrollLocked(animationState !== AnimationState.finished);
  }, [animationState, setScrollLocked]);

  return {
    state: { animationState, scrollY },
    actions: { startAnimation },
    visibility: { showClickPrompt, showScrollPrompt },
  };
}
