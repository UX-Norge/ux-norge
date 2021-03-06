import { Link } from "@Components/Link";
import { Ad } from "@Types";
import {
  BlockContent,
  Body2,
  Heading2,
  Heading4,
  Overline,
} from "@Ui/Typography";
import * as React from "react";

export const ListAd: React.FC<
  Pick<
    Ad,
    "title" | "description" | "jobType" | "advertiser" | "location" | "slug"
  >
> = ({ title, slug, description, advertiser, location }) => {
  if (!advertiser || location.every((loc) => !loc.name) || !slug?.current)
    return null;
  return (
    <Link type="ad" path={slug.current} className="block">
      <Heading2 className="text-h4">{title}</Heading2>
      <Overline className="my-4 text-green-500">
        {advertiser.name} • {location.map((loc) => loc?.name).join(", ")}
      </Overline>
      <Body2 className="text-gray-600">{description}</Body2>
    </Link>
  );
};
