import { Link } from "@Components/Link";
import { Ad } from "@Types";
import { BlockContent, Body2, Heading4, Overline } from "@Ui/Typography";
import * as React from "react";

export const ListAd: React.FC<
  Pick<
    Ad,
    "title" | "description" | "jobType" | "advertiser" | "location" | "slug"
  >
> = ({ title, slug, description, advertiser, location }) => {
  if (!advertiser || !location || !slug?.current) return null;
  return (
    <Link type="ad" path={slug.current} className="block">
      <Heading4 className="">{title}</Heading4>
      <Overline className="my-4 text-green-500">
        {advertiser.name} • {location.map(({ name }) => name).join(", ")}
      </Overline>
      <Body2 className="text-gray-600">{description}</Body2>
    </Link>
  );
};
