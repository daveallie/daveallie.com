import React from 'react';
import SEO from '../../components/SEO';
import ContentBlock from '../../components/ContentBlock';
import Text from '../../components/Text';
import BlogHeader from '../../components/pages/blog/BlogHeader';
import BlogFooter from '../../components/pages/blog/BlogFooter';
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
      <BlogHeader title="Dave Allie" titleStandalone />
      <Text container="div" color="dark">
        <ContentBlock>Here's what I've been writing about:</ContentBlock>
        <ContentBlock>
          <BlogPostList />
        </ContentBlock>
      </Text>
      <BlogFooter fixed includeHomeLink={false} />
    </>
  );
}
