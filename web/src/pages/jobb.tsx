import { Seo } from "@Components/Seo";
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

export const JobPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  let ads = cleanGraphqlArray(data.allSanityAd) as Ad[];
  const jobTypes = removeDuplicates(ads.map((ad) => ad.jobType));
  const locations = removeDuplicates(
    flatten(ads.map((ad) => ad.location.map((location) => location.name)))
  ) as string[];
  const [selectedJobTypes, setSelectedJobTypes] =
    React.useState<string[]>(jobTypes);
  const [selectedLocations, setSelectedLocations] =
    React.useState<string[]>(locations);
  const [filteredAds, setFilteredAds] = React.useState<Ad[]>(
    getJobPageAds(ads)
  );

  React.useEffect(() => {
    setFilteredAds(
      ads.filter((ad) => {
        return (
          ad.location.some(({ name }) => selectedLocations.includes(name)) &&
          selectedJobTypes.includes(ad.jobType)
        );
      })
    );
  }, [selectedJobTypes, selectedLocations]);

  return (
    <PageWrapper>
      <Seo title="Jobber" location={location} />
      <div className="mx-auto max-w-xl space-y-48">
        <Heading1>Jobber</Heading1>
        <div>
          <FilterRow
            options={jobTypes}
            selected={selectedJobTypes}
            setSelected={setSelectedJobTypes}
          />
          <FilterRow
            options={locations}
            selected={selectedLocations}
            setSelected={setSelectedLocations}
          />
        </div>
        {filteredAds.map((ad) => (
          <ListAd {...ad} />
        ))}
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
