import { Seo } from "@Components/Seo";
import { AdThumbnail } from "@Features/ad/components/AdThumbnail";
import { FilterRow } from "@Features/ad/components/FilterRow";
import { ALL_STRING, useJobPageAds } from "@Features/ad/lib/useAds";
import { cleanGraphqlArray, flatten, removeDuplicates } from "@Lib/helpers";
import { Ad, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityAd: GraphqlEdges;
}

export const JobPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  let ads = cleanGraphqlArray(data.allSanityAd) as Ad[];

  const {
    locations,
    jobTypes,
    selectedLocations,
    selectedJobTypes,
    filteredAds,
    setSelectedJobTypes,
    setSelectedLocations,
  } = useJobPageAds(ads);

  return (
    <PageWrapper>
      <Seo title="Jobber" location={location} />
      <div className="mx-auto max-w-xl space-y-24">
        <div>
          <FilterRow
            label="Område"
            allString={ALL_STRING}
            options={locations}
            selected={selectedLocations}
            setSelected={setSelectedLocations}
          />
          <FilterRow
            label="Stillingstype"
            allString={ALL_STRING}
            options={jobTypes}
            selected={selectedJobTypes}
            setSelected={setSelectedJobTypes}
          />
        </div>
        <div className="space-y-48 p-24">
          {filteredAds.map((ad) => (
            <AdThumbnail ad={ad} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    allSanityAd(
      filter: { packageType: { onAdsPage: { eq: true } } }
      sort: { fields: startDate, order: DESC }
    ) {
      edges {
        node {
          ...AdThumbnail
        }
      }
    }
  }
`;

export default JobPage;
