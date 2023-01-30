import {
  Category,
  NominateBannerType,
  PortableText,
  SlackBannerType,
} from "@Types";
import { BlockContent, Body1, Heading4 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface NominateSectionProps {
  category: Category;
  title: string;
  text: PortableText;
}

const UKENS_DESIGNER_CATEGORY_ID = "4f8fdbac-743d-48d3-aeb4-e332e9b3e2df";

export const NominateSection: React.FC<NominateSectionProps> = ({
  category,
  title,
  text,
}) => {
  if (!title || !text) return null;
  if (category._id !== UKENS_DESIGNER_CATEGORY_ID) return null;
  return (
    <div>
      <Heading4>{title}</Heading4>
      <div className="[&_a]:link [&_p]:text-base">
        <BlockContent blocks={text} />
      </div>
    </div>
  );
};
