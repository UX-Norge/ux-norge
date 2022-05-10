import { Seo } from "@Components/Seo";
import { AdThumbnail } from "@Features/ad/components/AdThumbnail";
import { FilterRow } from "@Features/ad/components/FilterRow";
import { ListAd } from "@Features/ad/components/ListAd";
import { getJobPageAds } from "@Features/ad/lib/getAds";
import { cleanGraphqlArray, flatten, removeDuplicates } from "@Lib/helpers";
import { Ad, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { Heading1, Heading4 } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityAd: GraphqlEdges;
}
export const ALL_STRING = "Alle";

export const JobPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  let ads = cleanGraphqlArray(data.allSanityAd) as Ad[];
  const jobTypes = removeDuplicates(
    ads.map((ad) => ad.jobType),
    true
  );
  const locations = removeDuplicates(
    flatten(ads.map((ad) => ad.location.map((location) => location.name))),
    true
  ) as string[];
  const [selectedJobTypes, setSelectedJobTypes] = React.useState<string[]>([
    ALL_STRING,
  ]);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([
    ALL_STRING,
  ]);

  const [filteredAds, setFilteredAds] = React.useState<Ad[]>(
    getJobPageAds(ads)
  );

  React.useEffect(() => {
    setFilteredAds(
      ads.filter((ad) => {
        const jobTypeMatch = selectedJobTypes.includes(ALL_STRING)
          ? true
          : selectedJobTypes.includes(ad.jobType);
        const locationMatch = selectedLocations.includes(ALL_STRING)
          ? true
          : ad.location.some(({ name }) => selectedLocations.includes(name));
        return jobTypeMatch && locationMatch;
      })
    );
  }, [selectedJobTypes, selectedLocations]);

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
