import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Ad, Article, GraphqlEdges } from "@Types";
import { ArticleBody, ArticleFooter } from "@Features/article";
import { PageWrapper } from "@Ui/Layout";
import { cleanGraphqlArray, shuffle } from "../lib/helpers";
import { ArticleHeader } from "@Features/article/components/ArticleHeader";
import { getRoute } from "@Components/Link";
import { Seo } from "../components/Seo";

interface DataProps {
  sanityArticle: Article;
  articleListAds: GraphqlEdges;
  articleBannerAds: GraphqlEdges;
  relatedArticles: GraphqlEdges;
}

const ArticlePage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
  pageContext,
}) => {
  const articleListAds = shuffle(
    cleanGraphqlArray(data.articleListAds) as Ad[]
  );
  console.log(pageContext);

  const articleBannerAds = cleanGraphqlArray(data.articleBannerAds) as Ad[];

  const relatedArticles = cleanGraphqlArray(data.relatedArticles) as Article[];
  console.log(articleBannerAds);

  return (
    <article>
      <Seo
        title={data.sanityArticle.title}
        description={data.sanityArticle.description}
        image={data.sanityArticle.mainImage?.image}
        imageAlt={data.sanityArticle.mainImage?.alt}
        location={location}
        type="article"
      />
      <PageWrapper>
        <ArticleHeader {...data.sanityArticle} />
        <ArticleBody
          body={data.sanityArticle.body}
          publishedAt={data.sanityArticle.publishedAt}
          articleListAds={articleListAds}
          articleBannerAds={articleBannerAds}
          readTime={10}
        />
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
      publishedAt
      mainImage {
        alt
        caption
        image {
          ...ImageWithPreview
        }
      }
      category {
        name
        slug {
          current
        }
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
          ...AdThumbnail
        }
      }
    }
    articleBannerAds: allSanityAd(filter: { _id: { in: $articleBannerAds } }) {
      edges {
        node {
          ...AdThumbnail
        }
      }
    }
  }
`;

export default ArticlePage;
