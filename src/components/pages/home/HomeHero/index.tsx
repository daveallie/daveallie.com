import React from 'react';
import cn from 'classnames';
import Text from '../../../Text';
import getNameStyles from './getNameStyles';
import useAnimationLifecycle, { AnimationState } from './useAnimationLifecycle';
import * as styles from './styles.module.scss';

export default function HomeHero() {
  const initialState =
    new URLSearchParams(window.location.search).get('skip') === '1'
      ? AnimationState.finished
      : AnimationState.notStarted;

  const {
    state: { animationState, scrollY },
    actions: { startAnimation },
    visibility: { showClickPrompt, showScrollPrompt },
  } = useAnimationLifecycle(initialState);

  const {
    firstNameStyles,
    firstNameLetterStyles,
    lastNameStyles,
  } = getNameStyles(animationState, scrollY);
  const animatingStyle = {
    [styles.preAnimation]: animationState === AnimationState.notStarted,
    [styles.animation]: animationState === AnimationState.started,
    [styles.postAnimation]: animationState === AnimationState.finished,
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Text
            weight={800}
            color="headingLight"
            size="33vw"
            container="div"
            className={cn(styles.header, styles.firstName)}
            style={firstNameStyles}
          >
            <span
              className={cn(styles.firstNameD, animatingStyle)}
              style={firstNameLetterStyles}
              onClick={startAnimation}
            >
              D
            </span>
            <span
              className={cn(styles.firstNameLetter, styles.A, animatingStyle)}
              style={firstNameLetterStyles}
            >
              A
            </span>
            <span
              className={cn(styles.firstNameLetter, styles.V, animatingStyle)}
              style={firstNameLetterStyles}
            >
              V
            </span>
            <span
              className={cn(styles.firstNameLetter, styles.E, animatingStyle)}
              style={firstNameLetterStyles}
            >
              E
            </span>
          </Text>
          {showClickPrompt ? (
            <div className={styles.clickPrompt}>
              <Text
                weight={600}
                color="subheadingLight"
                size="3.5vw"
                className={cn(
                  styles.clickPromptItem,
                  styles.clickPromptFirst,
                  styles.clickPromptFadeIn
                )}
              >
                Go on, click the D...
              </Text>
              <Text
                weight={600}
                color="subheadingLight"
                size="3.5vw"
                className={cn(
                  styles.clickPromptItem,
                  styles.clickPromptSecond,
                  styles.clickPromptFadeIn
                )}
              >
                You know you want to...
              </Text>
            </div>
          ) : null}
          <Text
            weight={800}
            color="headingLight"
            size="33vw"
            container="div"
            className={cn(styles.header, styles.lastName)}
            style={lastNameStyles}
          >
            <span
              className={cn(styles.lastNameLetter, styles.L1, animatingStyle)}
            >
              l
            </span>
            <span
              className={cn(styles.lastNameLetter, styles.L2, animatingStyle)}
            >
              l
            </span>
            <span
              className={cn(styles.lastNameLetter, styles.I, animatingStyle)}
            >
              i
            </span>
            <span
              className={cn(styles.lastNameLetter, styles.E, animatingStyle)}
            >
              e
            </span>
          </Text>
        </div>
      </div>
      <div className={styles.bottomSpacing}>
        <span
          className={cn('material-icons', styles.scrollArrowLeft, {
            [styles.scrollArrowVisible]: showScrollPrompt,
          })}
        >
          arrow_downward
        </span>
        <span
          className={cn('material-icons', styles.scrollArrowRight, {
            [styles.scrollArrowVisible]: showScrollPrompt,
          })}
        >
          arrow_downward
        </span>
      </div>
    </>
  );
}
