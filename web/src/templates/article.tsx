import * as React from "react";
import { graphql } from "gatsby";
import { Article } from "@Types";
import { ArticleBody } from "@Features/article";
import { Image } from "@Ui/Image";
import { PageWrapper } from "@Ui/Layout";

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
      <PageWrapper>
        <header className="mx-auto max-w-prose">
          <Image image={mainImage} alt={title} width={1000} className="" />
          <h1 className="heading-1">{title}</h1>
          <p>{}</p>
        </header>
        <main className="prose mx-auto">
          <ArticleBody body={body} />
        </main>
      </PageWrapper>
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
