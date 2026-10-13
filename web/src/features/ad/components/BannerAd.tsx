import { Link } from "@Components/Link";
import { classNames } from "@Lib/helpers";
import { Ad } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading3, Overline } from "@Ui/Typography";
import * as React from "react";
import { activeFilter, getDaysToDeadline } from "../lib/adHelpers";

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
    | "startDate"
    | "packageType"
  > & { onHomepage: boolean }
> = (ad) => {
  const {
    title,
    description,
    deadline,
    location,
    advertiser,
    slug,
    onHomepage,
  } = ad;
  if (!title || !description || !slug?.current || !advertiser) return null;
  if (!activeFilter(ad as Ad)) return null;
  return (
    <div className="not-prose">
      <Link
        path={slug.current}
        type="ad"
        className={classNames(
          "my-48 block break-words rounded-t-xs bg-gray-100 p-24 text-gray-900 shadow-door shadow-gray-200",
          { "-mx-24": !onHomepage }
        )}
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
          className="mt-24 h-48 mix-blend-darken"
        />
      </Link>
    </div>
  );
};
