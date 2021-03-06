import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import Deck from '~/components/Deck';
import SEO from '~/components/SEO';
import SSRGate from '~/components/SSRGate';
import usePageTracking from '~/hooks/usePageTracking';

type SlideshowQueryResult = {
  deck: {
    id: string;
    body: string & ReactNode;
    frontmatter: {
      title: string;
      imageUrl?: {
        childImageSharp: {
          fluid: {
            src: string;
          };
        };
      };
      author: string;
      slug: string;
      date: string;
      datestamp: string;
      updatestamp: string;
    };
  };
};

type SlideshowProps = {
  data: SlideshowQueryResult;
};

export default function Slides({ data: { deck } }: SlideshowProps) {
  usePageTracking();

  return (
    <>
      <SEO
        title={deck.frontmatter.title}
        path={`/${deck.frontmatter.slug}`}
        imageUrl={deck.frontmatter.imageUrl?.childImageSharp?.fluid?.src}
      />
      <SSRGate clientOnly>
        <Deck slug={deck.frontmatter.slug} body={deck.body} />
      </SSRGate>
    </>
  );
}

export const pageQuery = graphql`
  query DeckQuery($id: String) {
    deck(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        imageUrl {
          childImageSharp {
            fluid {
              src
            }
          }
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
