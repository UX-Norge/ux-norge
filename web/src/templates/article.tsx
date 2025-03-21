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
  relatedArticlesByCompany: GraphqlEdges;
  nominateBanner: { title: string; text: PortableText };
  discussInSlack: { title: string; text: PortableText };
}

function mergeArticleLists(list1: Article[], list2: Article[]): Article[] {
  const uniqueIds = new Set();
  const uniqueArticles = [...list1, ...list2]
    .filter(article => {
      if (!article.slug?.current || !article.title) {
        return false;
      }
      if (uniqueIds.has(article._id)) {
        return false;
      }
      uniqueIds.add(article._id);
      return true;
    })
    .sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1)
    .slice(0, 3);
  return uniqueArticles;
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
      : mergeArticleLists(cleanGraphqlArray(data.relatedArticles) as Article[], cleanGraphqlArray(data.relatedArticlesByCompany) as Article[]);
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
          company={article.company}
          publishedAt={article.publishedAt}
          updatedAt={article.updatedAt}
          articleListAds={articleListAds}
          articleBannerAds={articleBannerAds}
          isReadersLetter={article.isReadersLetter}
          isSponsoredContent={article.isSponsoredContent}
          slackMessageLink={article.slackMessageLink}
          discussInSlack={data.discussInSlack}
          nominateBanner={data.nominateBanner}
        />
        <ArticleFooter
          relatedArticles={relatedArticles}
          authors={article.authors}
          isSponsoredContent={article.isSponsoredContent}
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
    $categoryId: String,
    $companyId: String
  ) {
    sanityArticle(slug: { current: { eq: $slug } }) {
      title
      description
      publishedAt
      updatedAt
      metaTitle
      company { 
        name
      }
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
      isSponsoredContent
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
          publishedAt
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
    relatedArticlesByCompany: allSanityArticle(
      sort: { publishedAt: DESC }
      filter: {
        company: { _id: { eq: $companyId } }
        slug: { current: { ne: $slug } }
      }
      limit: 4
    ) {
      edges {
        node {
          _id
          title
          description
          publishedAt
          slug {
            current
          }
          company {
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
