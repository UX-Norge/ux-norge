import { graphql } from "gatsby";
import * as React from "react";
import { CoverPage } from "@Features/coverPage";

const IndexPage = ({ data: { sanityCoverPage } }) => {
  return <CoverPage blocks={sanityCoverPage.blocks} />;
};

export const query = graphql`
  query CoverPageQuery {
    sanityCoverPage(_id: { eq: "coverPage" }) {
      blocks {
        ... on SanityCoverCollections {
          _key
          _type
          title
          list {
            ...ArticleFragmentThumbnail
          }
        }
        ... on SanityCoverArticles {
          _key
          _type
          list {
            ...ArticleFragmentThumbnail
          }
          layout
        }
        ... on SanityCoverAds {
          _type
        }
      }
    }
  }
`;

export default IndexPage;
