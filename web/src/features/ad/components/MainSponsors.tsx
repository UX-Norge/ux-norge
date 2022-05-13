import { cleanGraphqlArray } from "@Lib/helpers";
import { Company, GraphqlEdges } from "@Types";
import { Heading2 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface IProps {}

export const MainSponsors: React.FC<IProps> = ({}) => {
  const { allSanityCompany } = useStaticQuery<{
    allSanityCompany: GraphqlEdges;
  }>(graphql`
    query {
      allSanityCompany(filter: { isPartner: { eq: true } }) {
        edges {
          node {
            name
            logo {
              ...ImageWithPreview
            }
          }
        }
      }
    }
  `);

  const sponsors = cleanGraphqlArray(allSanityCompany) as Company[];

  return (
    <div>
      <Heading2>Samarbeidsparntere:</Heading2>
      {sponsors.map((sponsor, index) => sponsor.name)}
    </div>
  );
};
