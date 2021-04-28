import React from 'react';
import ContentBlock from '../../components/ContentBlock';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import SEO from '../../components/SEO';
import Text from '../../components/Text';
import BlogPostList from '../../components/pages/blog/BlogPostList';
import useAlternateBodyBackground from '../../hooks/useAlternateBodyBackground';
import usePageTracking from '../../hooks/usePageTracking';
import '../../assets/styles/global.scss';

export default function BlogIndexPage() {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();

  return (
    <>
      <SEO />
      <PageHeader title="Dave Allie" titleStandalone />
      <Text container="div" color="dark">
        <ContentBlock>Here's what I've been writing about:</ContentBlock>
        <ContentBlock>
          <BlogPostList />
        </ContentBlock>
      </Text>
      <PageFooter fixed includeHomeLink={false} />
    </>
  );
}
