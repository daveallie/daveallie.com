import { ReactNode, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDeckContext } from '~/components/Deck/DeckContext';

export default function Step({
  index,
  showInLaterSteps,
  showIf,
  children,
}: {
  index: number;
  showInLaterSteps?: boolean;
  showIf?: (index: number) => boolean;
  children: ReactNode;
}) {
  const { pathname } = useLocation();
  const params = useParams();
  const viewingStepIndex = params.step ? parseInt(params.step) : 0;

  const { registerStep } = useDeckContext();
  useEffect(() => {
    registerStep(parseInt(pathname.split('/')[1] || '0'), index);
  }, [registerStep]);

  if (showIf) {
    return showIf(viewingStepIndex) ? children : null;
  }

  return viewingStepIndex === index ||
    (showInLaterSteps && viewingStepIndex > index)
    ? children
    : null;
}
