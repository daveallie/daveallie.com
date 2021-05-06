import React from 'react';
import SEO from '~/components/SEO';
import Error404 from '~/components/pages/404/Error404';
import useSiteUrlQuery from '~/hooks/queries/useSiteUrlQuery';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';
import '~/assets/styles/global.scss';

export default function Error404Page() {
  useAlternateBodyBackground('Hero');
  usePageTracking();
  const data = useSiteUrlQuery();

  return (
    <>
      <SEO />
      <Error404 home={data.site.siteMetadata.siteUrl} />
    </>
  );
}
