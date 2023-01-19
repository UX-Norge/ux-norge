import { PageHeader } from "@Components/PageHeader";
import { Seo } from "@Components/Seo";
import { AdThumbnail } from "@Features/ad/components/AdThumbnail";
import { FilterRow } from "@Features/ad/components/FilterRow";
import { ALL_STRING, useJobPageAds } from "@Features/ad/lib/useAds";
import { VectorIllustrations } from "@Images/VectorIllustrations";
import { cleanGraphqlArray } from "@Lib/helpers";
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
    setSelectedRemotes,
    selectedRemotes,
    remotes,
  } = useJobPageAds(ads);

  return (
    <PageWrapper>
      <Seo title="Jobber:" location={location} />
      <PageHeader
        title="Jobber"
        description="Her har vi samlet alle designjobbene på ett sted slik at du kan åpne nye dører for deg selv!"
        doors={<VectorIllustrations.jobPageDoors />}
      />
      <div className="mx-auto max-w-page space-y-24 px-24 py-40 ">
        <div className="grid gap-x-40 gap-y-24 md:grid-cols-3">
          <FilterRow
            label="Område:"
            allString={ALL_STRING}
            options={locations}
            selected={selectedLocations}
            setSelected={setSelectedLocations}
          />
          <FilterRow
            label="Remote:"
            allString={ALL_STRING}
            options={remotes}
            selected={selectedRemotes}
            setSelected={setSelectedRemotes}
          />
          <FilterRow
            label="Stillingstype:"
            allString={ALL_STRING}
            options={jobTypes}
            selected={selectedJobTypes}
            setSelected={setSelectedJobTypes}
          />
        </div>
        <div className=" grid gap-32 md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
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
