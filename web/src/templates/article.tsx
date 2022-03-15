import * as React from "react";
import { graphql } from "gatsby";
import { Article } from "../types/sanity-types";
import BlockContent from "../components/BlockContent";

interface IProps {
  data: { sanityArticle: Article };
}

const ArticlePage: React.FC<IProps> = ({
  data: {
    sanityArticle: { title, body },
  },
}) => {
  return (
    <article>
      <header>
        <h1>{title}</h1>
      </header>
      <main className="prose mx-auto">
        <BlockContent blocks={body} />
      </main>
    </article>
  );
};

export const query = graphql`
  query article($slug: String) {
    sanityArticle(slug: { current: { eq: $slug } }) {
      title
      mainImage {
        ...ImageWithPreview
      }
      body: _rawBody
    }
  }
`;

export default ArticlePage;
