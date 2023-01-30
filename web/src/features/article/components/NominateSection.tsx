import { Category, NominateBannerType, SlackBannerType } from "@Types";
import { BlockContent, Body1, Heading4 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface NominateSectionProps {
  category: Category;
}

const UKENS_DESIGNER_CATEGORY_ID = "4f8fdbac-743d-48d3-aeb4-e332e9b3e2df";

export const NominateSection: React.FC<NominateSectionProps> = ({
  category,
}) => {
  const { sanityNominateBanner } = useStaticQuery<{
    sanityNominateBanner: NominateBannerType;
  }>(graphql`
    query {
      sanityNominateBanner(_id: { eq: "nominateBanner" }) {
        title
        text: _rawText
      }
    }
  `);
  if (!sanityNominateBanner) return null;
  if (category._id !== UKENS_DESIGNER_CATEGORY_ID) return null;
  const { title, text } = sanityNominateBanner;
  return (
    <div>
      <Heading4>{title}</Heading4>
      <div className="[&_a]:link [&_p]:text-base">
        <BlockContent blocks={text} />
      </div>
    </div>
  );
};
