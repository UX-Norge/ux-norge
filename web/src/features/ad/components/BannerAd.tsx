import { Link } from "@Components/Link";
import { Ad } from "@Types";
import { Body1, Heading2 } from "@Ui/Typography";
import * as React from "react";

export const BannerAd: React.FC<
  Pick<
    Ad,
    "title" | "description" | "link" | "location" | "advertiser" | "slug"
  >
> = ({ title, description, location, advertiser, slug }) => {
  if (!title || !description || !slug?.current) return null;
  return (
    <div className="not-prose">
      <Link
        path={slug.current}
        type="ad"
        className="my-48 block break-words rounded bg-blue-100 p-48 text-gray-900"
      >
        <Heading2>{title}</Heading2>
        <Body1>{description}</Body1>
      </Link>
    </div>
  );
};
