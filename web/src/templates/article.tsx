import * as React from "react";
import { graphql } from "gatsby";
import { Article } from "../types/sanity-types";
import BlockContent from "../components/BlockContent";
import Layout from "../components/Layout";
import Image from "../components/Image";

interface IProps {
  data: { sanityArticle: Article };
}

const ArticlePage: React.FC<IProps> = ({
  data: {
    sanityArticle: { title, body, mainImage },
  },
}) => {
  return (
    <article>
      <Layout>
        <header className="max-w-prose mx-auto">
          <Image image={mainImage} alt={title} width={1000} className="" />
          <h1 className="heading-1">{title}</h1>
          <p>{}</p>
        </header>
        <main className="prose mx-auto">
          <BlockContent blocks={body} />
        </main>
      </Layout>
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
      body: _rawBody(resolveReferences: { maxDepth: 3 })
    }
  }
`;

export default ArticlePage;
