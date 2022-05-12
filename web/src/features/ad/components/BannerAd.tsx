import { Link } from "@Components/Link";
import { Ad } from "@Types";
import { BlockContent, Body1, Heading2, Heading3 } from "@Ui/Typography";
import * as React from "react";
import PortableText from "react-portable-text";

export const BannerAd: React.FC<
  Pick<
    Ad,
    "title" | "description" | "link" | "location" | "advertiser" | "slug"
  >
> = ({ title, description, location, advertiser, slug }) => {
  if (!title || !description || !slug?.current) return null;
  return (
    <Link
      path={slug.current}
      type="ad"
      className="not-prose my-48 block rounded bg-orange-400 p-48"
    >
      <Heading2>{title}</Heading2>
      <Body1>{description}</Body1>
    </Link>
  );
};
