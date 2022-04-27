import * as React from "react";
import { graphql } from "gatsby";
import { Ad, Article, GraphqlEdges } from "@Types";
import { ArticleBody } from "@Features/article";
import { Image } from "@Ui/Image";
import { PageWrapper } from "@Ui/Layout";
import { Heading1 } from "@Ui/Typography";
import { cleanGraphqlArray } from "../lib/helperts";
interface IProps {
  data: {
    sanityArticle: Article;
    articleListAds: GraphqlEdges;
    articleBannerAds: GraphqlEdges;
  };
}

const ArticlePage: React.FC<IProps> = ({ data }) => {
  const { title, mainImage, body } = data.sanityArticle;
  const articleListAds = cleanGraphqlArray(data.articleListAds.edges) as Ad[];
  const articleBannerAds = cleanGraphqlArray(
    data.articleBannerAds.edges
  ) as Ad[];

  return (
    <article>
      <PageWrapper>
        <header className="mx-auto max-w-prose">
          {mainImage && (
            <Image
              image={mainImage.image}
              alt={mainImage.alt || title}
              width={1000}
              className=""
              title={mainImage.caption}
            />
          )}
          <Heading1 className="heading-1">{title}</Heading1>
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
  query ArticleQuery(
    $slug: String
    $articleListAds: [String]
    $articleBannerAds: [String]
  ) {
    sanityArticle(slug: { current: { eq: $slug } }) {
      title
      mainImage {
        ...ArticleImage
      }
      body: _rawBody(resolveReferences: { maxDepth: 3 })
    }
    articleListAds: allSanityAd(filter: { _id: { in: $articleListAds } }) {
      edges {
        node {
          title
        }
      }
    }
    articleBannerAds: allSanityAd(filter: { _id: { in: $articleBannerAds } }) {
      edges {
        node {
          title
          text: _rawText
        }
      }
    }
  }
`;

export default ArticlePage;
