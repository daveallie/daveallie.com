import React from 'react';
import { navigate } from 'gatsby';
import DeckWrapper from '~/components/Deck/DeckWrapper';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';
import SEO from '~/components/SEO';
import SSRGate from '~/components/SSRGate';
import useSlidesListQuery from '~/hooks/queries/useSlidesListQuery';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';
import * as styles from './styles.module.scss';
import '~/assets/styles/global.scss';

export default function SlidesIndexPage() {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();
  const {
    allDeck: { nodes },
  } = useSlidesListQuery();

  return (
    <>
      <SEO />
      <PageHeader title="Dave Allie - Slides" titleStandalone />
      <div className={styles.deckGrid}>
        {nodes.map((node) => (
          <div
            key={node.id}
            className={styles.deckContainer}
            onClick={() => {
              // @ts-ignore
              navigate(`/${node.frontmatter.slug}`);
            }}
          >
            <SSRGate clientOnly>
              <DeckWrapper slug={node.frontmatter.slug} navDisabled>
                Missing
              </DeckWrapper>
            </SSRGate>
          </div>
        ))}
      </div>
      <PageFooter fixed includeHomeLink={false} />
    </>
  );
}
