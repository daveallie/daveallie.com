import React from 'react';
import WhiteBackedContent from '../../components/WhiteBackedContent';
import SEO from '../../components/seo';
import HomeHero from '../../components/pages/index/HomeHero';
import AboutMe from '../../components/pages/index/AboutMe';
import '../../assets/styles/global.scss';

export default function IndexPage() {
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
