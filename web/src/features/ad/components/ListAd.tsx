import { Link } from "@Components/Link";
import { Ad } from "@Types";
import {
  Body2,
  Heading2,
  Overline,
} from "@Ui/Typography";
import * as React from "react";
import { activeFilter } from "../lib/adHelpers";

export const ListAd: React.FC<
  Pick<
    Ad,
    | "title"
    | "description"
    | "jobType"
    | "advertiser"
    | "location"
    | "slug"
    | "startDate"
    | "deadline"
    | "packageType"
  >
> = (ad) => {
  const { title, slug, description, advertiser, location } = ad;
  if (!advertiser || location.every((loc) => !loc.name) || !slug?.current)
    return null;
  if (!activeFilter(ad as Ad)) return null;
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
