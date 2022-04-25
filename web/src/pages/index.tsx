import { graphql } from "gatsby";
import * as React from "react";
import { CoverPage } from "@Features/coverPage";
import { ErrorPage } from "@Ui/ErrorPage/ErrorPage";
import { CoverBlock } from "@Types";

const IndexPage: React.FC<{
  data: { sanityCoverPage: { blocks: CoverBlock[] } };
}> = ({ data: { sanityCoverPage } }) => {
  console.log(sanityCoverPage);
  if (!sanityCoverPage) {
    return (
      <ErrorPage
        title="Aiaiai!"
        message="Her har noe gått galt med hentingen av data til forsiden 😱"
        type={500}
      />
    );
  }

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
