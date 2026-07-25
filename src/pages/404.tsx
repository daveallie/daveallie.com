import React from 'react';
import Error404 from '~/components/pages/404/Error404';
import SEO from '~/components/SEO';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';
import siteMetadata from '../../config/util/siteMetadata';
import '~/assets/styles/global.scss';

export default function Error404Page() {
  useAlternateBodyBackground('Hero');
  usePageTracking();

  return <Error404 home={siteMetadata.siteUrl} />;
}

export const Head = () => <SEO />;
