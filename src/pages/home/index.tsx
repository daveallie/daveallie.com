import React from 'react';
import WhiteBackedContent from '../../components/WhiteBackedContent';
import SEO from '../../components/seo';
import HomeHero from '../../components/pages/index/HomeHero';
import AboutMe from '../../components/pages/index/AboutMe';
import useAlternateBodyBackground from '../../hooks/useAlternateBodyBackground';
import '../../assets/styles/global.scss';

export default function HomeIndexPage() {
  useAlternateBodyBackground('Hero');

  return (
    <>
      <SEO />
      <HomeHero />
      <WhiteBackedContent>
        <AboutMe />
      </WhiteBackedContent>
    </>
  );
}
