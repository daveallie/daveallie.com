import React from 'react';
import HR from '~/components/HR';
import PageFooter from '~/components/PageFooter';
import PageHeader from '~/components/PageHeader';
import SEO from '~/components/SEO';
import Text from '~/components/Text';
import BlogPostList from '~/components/pages/blog/BlogPostList';
import BlogSignupForm from '~/components/pages/blog/BlogSignupForm';
import useBlogPostListQuery from '~/hooks/queries/useBlogPostListQuery';
import useAlternateBodyBackground from '~/hooks/useAlternateBodyBackground';
import usePageTracking from '~/hooks/usePageTracking';
import '~/assets/styles/global.scss';

export default function BlogIndexPage() {
  useAlternateBodyBackground('Offwhite');
  usePageTracking();
  const {
    allMdx: { nodes },
  } = useBlogPostListQuery();

  return (
    <>
      <SEO />
      <PageHeader title="Dave Allie" titleStandalone />
      <Text container="div" color="dark">
        <BlogPostList data={nodes} />
      </Text>
      <HR />
      <BlogSignupForm />
      <div style={{ marginBottom: '6rem' }} />
      <PageFooter fixed includeHomeLink={false} />
    </>
  );
}
