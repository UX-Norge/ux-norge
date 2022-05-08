import { graphql } from "gatsby";
import * as React from "react";
import { CoverPage } from "@Features/coverPage";
import { ErrorPage } from "@Ui/ErrorPage/ErrorPage";
import { GraphqlEdges, Ad, Article } from "@Types";
import { cleanGraphqlArray } from "../lib/helpers";
import { getCoverPageAds } from "@Features/ad/lib/getAds";

interface IProps {
  data: { allSanityArticle: GraphqlEdges; allSanityAd: GraphqlEdges };
}

const IndexPage: React.FC<IProps> = ({ data }) => {
  let articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  let ads = cleanGraphqlArray(data.allSanityAd) as Ad[];

  articles = articles.filter(
    (article) => article.title && article.description && article.slug.current
  );

  const { listAds, bannerAds } = getCoverPageAds(ads);

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
    <CoverPage articles={articles} listAds={listAds} bannerAds={bannerAds} />
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
    allSanityAd {
      edges {
        node {
          title
          slug {
            current
          }
          location
          jobType
          advertiser {
            name
            logo {
              ...Image
            }
          }
          startDate
          packageType {
            duration
            onCoverPage
          }
          link
        }
      }
    }
  }
`;

export default IndexPage;
