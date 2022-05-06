import * as React from "react";
import { graphql } from "gatsby";
import { Ad, Article, GraphqlEdges } from "@Types";
import { ArticleBody, ArticleFooter } from "@Features/article";
import { PageWrapper } from "@Ui/Layout";
import { cleanGraphqlArray, shuffle } from "../lib/helpers";
import { ArticleHeader } from "@Features/article/components/ArticleHeader";
import { getRoute } from "@Components/Link";
import { Seo } from "../components/Seo";

interface IProps {
  data: {
    sanityArticle: Article;
    articleListAds: GraphqlEdges;
    articleBannerAds: GraphqlEdges;
    relatedArticles: GraphqlEdges;
  };
  location: any;
}

const ArticlePage: React.FC<IProps> = ({ data, location }) => {
  const articleListAds = shuffle(
    cleanGraphqlArray(data.articleListAds) as Ad[]
  );
  const articleBannerAds = cleanGraphqlArray(data.articleBannerAds) as Ad[];

  const relatedArticles = cleanGraphqlArray(data.relatedArticles) as Article[];

  return (
    <article>
      <Seo
        title={data.sanityArticle.title}
        description={data.sanityArticle.description}
        image={data.sanityArticle.mainImage?.image}
        imageAlt={data.sanityArticle.mainImage?.alt}
        path={location.href}
        type="article"
      />
      <PageWrapper>
        <ArticleHeader {...data.sanityArticle} />
        <ArticleBody body={data.sanityArticle.body} />
        <ArticleFooter
          relatedArticles={relatedArticles}
          authors={data.sanityArticle.authors}
        />
      </PageWrapper>
    </article>
  );
};

export const query = graphql`
  query ArticleQuery(
    $slug: String
    $articleListAds: [String]
    $articleBannerAds: [String]
    $categoryId: String
  ) {
    sanityArticle(slug: { current: { eq: $slug } }) {
      title
      description
      mainImage {
        alt
        caption
        image {
          asset {
            _id
            metadata {
              dimensions {
                width
                height
              }
            }
          }
          hotspot: _rawHotspot
          crop: _rawCrop
        }
      }
      category {
        name
      }
      authors {
        name
        slug {
          current
        }
        image {
          ...ImageWithPreview
        }
        company {
          name
        }
      }
      body: _rawBody(resolveReferences: { maxDepth: 3 })
    }
    relatedArticles: allSanityArticle(
      sort: { fields: publishedAt, order: DESC }
      filter: {
        category: { _id: { eq: $categoryId } }
        slug: { current: { ne: $slug } }
      }
      limit: 4
    ) {
      edges {
        node {
          title
          description
          slug {
            current
          }
          category {
            name
          }
          mainImage {
            ...ArticleImage
          }
        }
      }
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
