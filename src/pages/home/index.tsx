import React from 'react';
import SEO from '~/components/SEO';
import AboutMe from '~/components/pages/home/AboutMe';
import HomeHero from '~/components/pages/home/HomeHero';
import OffWhiteContainer from '~/components/pages/home/OffWhiteContainer';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import useAlternateBodyStyle from '~/hooks/useAlternateBodyStyle';
import usePageTracking from '~/hooks/usePageTracking';
import * as styles from './styles.module.scss';
import '~/assets/styles/global.scss';

export default function HomeIndexPage() {
  useAlternateBodyBackground('Hero');
  useAlternateBodyStyle(styles.hiddenScrollbar);
  usePageTracking();

  return (
    <>
      <SEO />
      <HomeHero />
      <OffWhiteContainer>
        <AboutMe />
      </OffWhiteContainer>
    </>
  );
}
