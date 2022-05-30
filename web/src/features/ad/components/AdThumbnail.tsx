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
      className="group flex gap-16 odd:flex-row-reverse lg:odd:flex-row"
    >
      <div className="flex w-[120px] items-center justify-center rounded-t-lg bg-yellow-100 p-8 shadow-[inset_-4px_0_0_0_var(--color-yellow-200)] transition-shadow group-hover:shadow-[inset_-8px_0_0_0_var(--color-yellow-200)]">
        <Image
          image={ad.advertiser.logo}
          alt={ad.advertiser.name + "-logo"}
          width={200}
          className="max-w-full"
        />
      </div>
      <div className="w-full">
        <Heading4 className="mb-8">{ad.title}</Heading4>
        <Overline className="text-yellow-500">
          {ad.advertiser.name} • 
          {ad.location.map(({ name }) => name).join(",")}
        </Overline>
        <Body2>{ad.description}</Body2>
        <Overline className="mt-8 text-yellow-500">{deadline()}</Overline>
      </div>
    </Link>
  );
};
