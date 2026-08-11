import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Company, GraphqlEdges, PartnerBanner } from "@Types";
import { Button } from "@Ui/Button";
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
      allSanityCompany(
        filter: { isPartner: { eq: true } }
        sort: { name: ASC }
      ) {
        edges {
          node {
            name
            hasPartnerPage
            slug {
              current
            }
            logo {
              ...ImageWithPreview
            }
          }
        }
      }
    }
  `);

  let sponsors = cleanGraphqlArray(allSanityCompany) as Company[];

  return (
    <div className="bg-yellow-50 px-24 py-96 text-center">
      <div className="mx-auto w-full max-w-page ">
        <Heading2>{title}</Heading2>
        <div className="my-48 flex flex-wrap justify-center gap-48">
          {sponsors.map((sponsor, index) =>
            sponsor.hasPartnerPage && sponsor.slug?.current ? (
              <Link
                key={`partner-${index}`}
                type="partner"
                path={sponsor.slug.current}
                className="hover:underline"
              >
                {sponsor.name}
              </Link>
            ) : (
              <div key={`partner-${index}`}>{sponsor.name}</div>
            )
          )}
        </div>
        <Button href={page.slug.current} color="primary">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
