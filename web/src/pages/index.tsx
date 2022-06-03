import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { CoverPage } from "@Features/coverPage";
import { ErrorPage } from "@Ui/ErrorPage/ErrorPage";
import { GraphqlEdges, Ad, Article } from "@Types";
import { cleanGraphqlArray } from "../lib/helpers";
import { useCoverPageAds } from "@Features/ad/lib/useAds";
import { Seo } from "@Components/Seo";

interface DataProps {
  allSanityArticle: GraphqlEdges;
  allSanityAd: GraphqlEdges;
}

const IndexPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  let articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  let ads = cleanGraphqlArray(data.allSanityAd) as Ad[];

  articles = articles.filter(
    (article) => article.title && article.description && article.slug?.current
  );

  const { listAds, bannerAds } = useCoverPageAds(ads);

  console.log(bannerAds);

  if (!articles) {
    return (
      <ErrorPage
        title="Aiaiai!"
        message="Her har noe gått galt med hentingen av data til forsiden 😱"
        type={500}
      />
    );
  }

  return (
    <>
      <Seo location={location} />
      <CoverPage articles={articles} listAds={listAds} bannerAds={bannerAds} />
    </>
  );
};

export const query = graphql`
  query CoverPageQuery {
    allSanityArticle(sort: { order: DESC, fields: publishedAt }) {
      edges {
        node {
          ...ArticleThumbnail
        }
      }
    }
    allSanityAd(sort: { fields: _createdAt, order: DESC }) {
      edges {
        node {
          ...AdThumbnail
          packageType {
            onCoverPage
            duration
            type
          }
        }
      }
    }
  }
`;

export default IndexPage;
