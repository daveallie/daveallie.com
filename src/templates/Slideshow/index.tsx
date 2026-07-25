import React from 'react';
import { graphql } from 'gatsby';
import Deck from '~/components/Deck';
import SEO from '~/components/SEO';
import SSRGate from '~/components/SSRGate';
import usePageTracking from '~/hooks/usePageTracking';

// gatsby-plugin-mdx re-parses templates that render MDX bodies with a plain-JS
// parser, so this file can't contain any TypeScript syntax — no type aliases
// and no parameter annotations. templates/BlogPost has the same constraint.

// @ts-ignore
export default function Slides({ children }) {
  usePageTracking();

  return (
    <SSRGate clientOnly>
      <Deck>{children}</Deck>
    </SSRGate>
  );
}

// @ts-ignore
export const Head = ({ data: { deck } }) => (
  <SEO
    title={deck.frontmatter.title}
    path={`/${deck.frontmatter.slug}`}
    imageUrl={deck.frontmatter.imageUrl?.publicURL}
  />
);

export const pageQuery = graphql`
  query DeckQuery($id: String) {
    deck(id: { eq: $id }) {
      id
      frontmatter {
        title
        imageUrl {
          publicURL
        }
        author
        slug
        date(formatString: "ll")
        datestamp: date
        updatestamp: update_date
      }
    }
  }
`;
