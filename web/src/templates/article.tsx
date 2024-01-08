import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { Ad, Article, GraphqlEdges, PortableText } from "@Types";
import { ArticleBody, ArticleFooter } from "@Features/article";
import { PageWrapper } from "@Ui/Layout";
import { cleanGraphqlArray, shuffle } from "../lib/helpers";
import { ArticleHeader } from "@Features/article/components/ArticleHeader";
import { Seo } from "../components/Seo";

interface DataProps {
  sanityArticle: Article;
  articleListAds: GraphqlEdges;
  articleBannerAds: GraphqlEdges;
  relatedArticles: GraphqlEdges;
  nominateBanner: { title: string; text: PortableText };
  discussInSlack: { title: string; text: PortableText };
}

const ArticlePage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const article = data.sanityArticle;
  const articleListAds = shuffle(
    cleanGraphqlArray(data.articleListAds) as Ad[]
  );

  const articleBannerAds = cleanGraphqlArray(data.articleBannerAds) as Ad[];

  const relatedArticles =
    article.relatedArticles && article.relatedArticles.length > 0
      ? article.relatedArticles
      : (cleanGraphqlArray(data.relatedArticles) as Article[]);

  return (
    <article>
      <Seo
        title={article.metaTitle || article.title}
        description={article.description}
        image={article.mainImage?.image}
        imageAlt={article.mainImage?.alt}
        location={location}
        publishDate={article.publishedAt}
        type="article"
        authors={article.authors}
      />
      <PageWrapper>
        <ArticleHeader {...article} />
        <ArticleBody
          category={article.category}
          body={article.body}
          publishedAt={article.publishedAt}
          articleListAds={articleListAds}
          articleBannerAds={articleBannerAds}
          isReadersLetter={article.isReadersLetter}
          slackMessageLink={article.slackMessageLink}
          discussInSlack={data.discussInSlack}
          nominateBanner={data.nominateBanner}
        />
        <ArticleFooter
          relatedArticles={relatedArticles}
          authors={article.authors}
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
      coverPageTitle
      description
      publishedAt
      metaTitle
      companyName
      companyType
      mainImage {
        alt
        image {
          ...ImageWithPreview
        }
      }
      category {
        _id
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
      relatedArticles {
        _id
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
      slackMessageLink
      isReadersLetter
      body: _rawBody(resolveReferences: { maxDepth: 4 })
    }
    relatedArticles: allSanityArticle(
      sort: { publishedAt: DESC }
      filter: {
        category: { _id: { eq: $categoryId } }
        slug: { current: { ne: $slug } }
      }
      limit: 4
    ) {
      edges {
        node {
          _id
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
    discussInSlack: sanityDiscussInSlack(_id: { eq: "discussInSlack" }) {
      title
      text: _rawText
    }
    nominateBanner: sanityNominateBanner(_id: { eq: "nominateBanner" }) {
      title
      text: _rawText
    }
  }
`;

export default ArticlePage;
