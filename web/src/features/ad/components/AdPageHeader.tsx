import { classNames } from "@Lib/helpers";
import { Ad } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading1, Overline } from "@Ui/Typography";
import * as React from "react";
import { getDaysToDeadline } from "../lib/getDaysToDeadline";

interface IProps {}

export const AdPageHeader: React.FC<
  Pick<
    Ad,
    "title" | "image" | "deadline" | "advertiser" | "location" | "description"
  >
> = ({ title, image, deadline, advertiser, location, description }) => {
  return (
    <header
      className={classNames("mt-48 md:grid md:grid-cols-2 md:items-center", {
        "mx-auto max-w-prose grid-cols-1": !image,
      })}
    >
      <div className="p-24 md:order-1">
        <Overline className="text-blue-500">
          {advertiser.name} • {location.map(({ name }) => name).join(", ")}
        </Overline>
        <Heading1 className="wrap hyphen break-words">{title}</Heading1>
        <Body1 className="font-bold">{description}</Body1>
        <Overline className="mt-24 text-blue-500">
          {getDaysToDeadline(deadline)}
        </Overline>
      </div>
      {image && (
        <div className="aspect-w-1 aspect-h-1 mr-24">
          <Image
            className="mb-24 rounded-tr-xl rounded-br-xs object-cover md:rounded-t-xl"
            image={image}
            alt={title}
            width={1000}
          />
          <div className="absolute top-1/3 -left-96 -z-10 h-2/3 rounded-t-xl bg-blue-200" />
        </div>
      )}
    </header>
  );
};
