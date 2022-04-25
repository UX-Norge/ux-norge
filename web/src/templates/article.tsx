import * as React from "react";
import { graphql } from "gatsby";
import { Ads, Article } from "@Types";
import { ArticleBody } from "@Features/article";
import { Image } from "@Ui/Image";
import { PageWrapper } from "@Ui/Layout";
import { Heading1 } from "@Ui/Typography";
interface IProps {
  data: {
    sanityArticle: Article;
    articleListAds: { edges: Ads };
    articleBannerAds: { edges: Ads };
  };
}

const ArticlePage: React.FC<IProps> = ({
  data: {
    sanityArticle: { title, body, mainImage },
    articleListAds,
    articleBannerAds,
  },
}) => {
  console.log(articleListAds);

  return (
    <article>
      <PageWrapper>
        <header className="mx-auto max-w-prose">
          <Image
            image={mainImage.image}
            alt={mainImage.alt || title}
            width={1000}
            className=""
            title={mainImage.caption}
          />
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
        image {
          ...ImageWithPreview
        }
        alt
        caption
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
