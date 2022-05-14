import { cleanGraphqlArray, shuffle } from "@Lib/helpers";
import { Company, GraphqlEdges, PartnerBanner } from "@Types";
import { Button } from "@Ui/Button";
import { Image } from "@Ui/Image";
import { Heading2 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface IProps {}

export const Partners: React.FC<IProps> = ({}) => {
  const {
    allSanityCompany,
    sanityPartnerBanner: { title, buttonText, page },
  } = useStaticQuery<{
    allSanityCompany: GraphqlEdges;
    sanityPartnerBanner: PartnerBanner;
  }>(graphql`
    query {
      sanityPartnerBanner(_id: { eq: "partnerBanner" }) {
        title
        buttonText
        page {
          slug {
            current
          }
        }
      }
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

  const sponsors = shuffle(cleanGraphqlArray(allSanityCompany)) as Company[];

  return (
    <div className="bg-yellow-50 px-24 py-96 text-center">
      <div className="mx-auto w-full max-w-page ">
        <Heading2>{title}</Heading2>
        <div className="my-48 flex flex-wrap justify-center gap-48">
          {sponsors.map((sponsor, index) => (
            <div key={`partner-${index}`}>{sponsor.name}</div>
          ))}
        </div>
        <Button href={page.slug.current} color="primary">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
