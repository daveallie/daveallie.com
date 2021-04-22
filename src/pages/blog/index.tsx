import React from 'react';
import SEO from '../../components/SEO';
import useAlternateBodyBackground from '../../hooks/useAlternateBodyBackground';
import '../../assets/styles/global.scss';

export default function BlogIndexPage() {
  useAlternateBodyBackground('Offwhite');

  return (
    <>
      <SEO />
      blog home
    </>
  );
}
