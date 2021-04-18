import React from 'react';
import SEO from '../components/seo';
import Error404 from '../components/pages/404/Error404';
import useAlternateBodyBackground from '../hooks/useAlternateBodyBackground';
import '../assets/styles/global.scss';

export default function Error404Page() {
  useAlternateBodyBackground('Hero');

  return (
    <>
      <SEO />
      <Error404 />
    </>
  );
}
