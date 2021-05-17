import React from 'react';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';
import SEO from '~/components/SEO';
import Calendly from '~/components/pages/meet/Calendly';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';
import '~/assets/styles/global.scss';

export default function MeetIndexPage() {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();

  return (
    <>
      <SEO title="Meet" />
      <PageHeader title="Meet Dave Allie" titleStandalone />
      <Calendly />
      <PageFooter includeHomeLink={false} fixed />
    </>
  );
}
