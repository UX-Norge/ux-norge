import { Link } from "@Components/Link";
import { daysLeft } from "@Lib/helpers";
import { Ad } from "@Types";
import { Image } from "@Ui/Image";
import { Body2, Heading4, Overline } from "@Ui/Typography";
import * as React from "react";
import { activeFilter } from "../lib/adHelpers";

interface IProps {
  ad: Ad;
}

export const AdThumbnail: React.FC<IProps> = ({ ad }) => {
  if (!activeFilter(ad)) return null;

  const deadline = () => {
    if (!ad.deadline) return "Ansetter løpende";
    const daysLeftValue = daysLeft(ad.deadline);
    return daysLeftValue > 0
      ? `${daysLeftValue} dager igjen`
      : `Fristen har gått ut`;
  };
  return (
    <Link
      type="ad"
      path={ad.slug.current}
      className="flex flex-col gap-16 rounded-sm bg-yellow-100 p-16"
    >
      <div className="flex gap-16">
        <div>
          <div className="h-24 w-48 rounded-t-full bg-yellow-200" />
          <div className="flex h-48 w-48 items-center bg-yellow-200 p-12 pt-0">
            <Image
              image={ad.advertiser.logo}
              alt={ad.advertiser.name + "-logo"}
              width={200}
              className="max-h-full max-w-full"
            />
          </div>
        </div>
        <Heading4 className="mb-8 self-center">{ad.title}</Heading4>
      </div>
      <Body2>{ad.description}</Body2>
      {ad.deadline && (
        <Body2>{`📆 Søknadsfrist: ${new Date(ad.deadline)
          .toLocaleDateString("no-NO", {
            month: "short",
            day: "numeric",
          })
          .slice(0, -1)} • ${deadline()}`}</Body2>
      )}
      {ad.advertiser && <Body2>{`💼 Bedrift: ${ad.advertiser.name}`}</Body2>}
      {ad.advertiser.name && (
        <Body2>{`📍 Sted: ${ad.location
          .map((location) => location.name)
          .join(", ")}`}</Body2>
      )}
    </Link>
  );
};
