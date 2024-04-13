import { AnimationState } from './useAnimationLifecycle';

export default function getNameStyles(
  animationState: AnimationState,
  scrollY: number,
) {
  if (animationState !== AnimationState.finished) {
    return { firstNameStyles: {}, lastNameStyles: {} };
  }

  const percent = Math.max(0, Math.min((2.0 * scrollY) / 700.0, 1));
  const firstNameRotation = Math.min(45 + (78 - 45) * 2 * percent, 78);
  const firstNameTopMargin = Math.max(-2 * 2 * percent, -2);
  const firstNameOpacity =
    percent < 0.4 ? 1 : Math.max((0.5 - percent - 0.01) * 10, 0);

  const lastNameRotation =
    percent <= 0.5
      ? Math.max(45 * (1 - percent * 2), 0)
      : Math.max(-90 * (percent - 0.5) * 2, -90);
  const lastNameSkew = Math.min(-8 + 16 * percent, 0);
  // const lastNameTranslate = Math.max(-16 * percent, -16)
  const lastNameTranslateX =
    percent <= 0.5
      ? Math.max(-16 * percent, -8)
      : -8 - 16 * 2 * (percent - 0.5);
  const lastNameTranslateZ = 0; // percent <= 0.7 ? 0 : (10 * 3/10 * (percent - 0.7))
  const lastNameOpacity = percent < 0.9 ? 1 : Math.max((1 - percent) * 10, 0);

  // 45 top
  // 74 start fade
  // 78 bottom

  const firstNameStyles = { marginTop: `${firstNameTopMargin}vw` };
  const firstNameLetterStyles = {
    opacity: firstNameOpacity,
    transform: `rotateX(${firstNameRotation}deg)`,
  };
  const lastNameStyles = {
    opacity: lastNameOpacity,
    transform: `perspective(60vw) rotate(90deg) rotateY(${lastNameRotation}deg) skew(0, ${lastNameSkew}deg) translateX(${lastNameTranslateX}vw) translateZ(${lastNameTranslateZ}vw)`,
  };

  return {
    firstNameStyles,
    firstNameLetterStyles,
    lastNameStyles,
  };
}
