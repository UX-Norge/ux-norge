import { Link } from "@Components/Link";
import { Ad } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading2, Heading3, Overline } from "@Ui/Typography";
import * as React from "react";
import company from "studio/app/schemas/documents/company";
import { getDaysToDeadline } from "../lib/adHelpers";

export const BannerAd: React.FC<
  Pick<
    Ad,
    | "title"
    | "description"
    | "link"
    | "location"
    | "advertiser"
    | "slug"
    | "deadline"
  >
> = ({ title, description, deadline, location, advertiser, slug }) => {
  if (!title || !description || !slug?.current || !advertiser) return null;
  return (
    <div className="not-prose">
      <Link
        path={slug.current}
        type="ad"
        className="my-48 block break-words rounded-xs bg-pink-200 p-24 text-gray-900"
      >
        <Overline className="mb-8 text-gray-900">
          {getDaysToDeadline(deadline)}
        </Overline>
        <Heading3>{title}</Heading3>
        <Overline className="text-gray-900">
          {advertiser.name} • {location.map((place) => place.name).join(", ")}
        </Overline>
        <Body1 className="mt-16 max-w-prose">{description}</Body1>
        <Image
          image={advertiser.logo}
          alt=""
          width={150}
          className="mt-24 h-48"
        />
      </Link>
    </div>
  );
};
