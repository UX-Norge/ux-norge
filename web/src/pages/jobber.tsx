import { ListAd } from "@Features/ad/components/ListAd";
import { getJobPageAds } from "@Features/ad/lib/getAds";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { Heading1, Heading4 } from "@Ui/Typography";
import { graphql } from "gatsby";
import * as React from "react";

interface IProps {
  data: {
    allSanityAd: GraphqlEdges;
  };
}

export const JobPage: React.FC<IProps> = ({ data }) => {
  let ads = cleanGraphqlArray(data.allSanityAd) as Ad[];
  console.log(data);

  ads = getJobPageAds(ads);

  return (
    <PageWrapper>
      <div className="mx-auto grid max-w-page-sm grid-cols-[200px_1fr]">
        <div>
          <Heading4>Filter:</Heading4>
        </div>
        <div className="max-w-xl space-y-48">
          <Heading1>Jobber</Heading1>
          {ads.map((ad) => (
            <ListAd {...ad} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    allSanityAd(sort: { fields: startDate, order: DESC }) {
      edges {
        node {
          ...AdThumbnail
        }
      }
    }
  }
`;

export default JobPage;
