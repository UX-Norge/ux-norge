import { Ad } from "@Types";
import { BlockContent, Body1, Heading3 } from "@Ui/Typography";
import * as React from "react";
import PortableText from "react-portable-text";

export const BannerAd: React.FC<
  Pick<Ad, "title" | "description" | "link" | "location" | "advertiser">
> = ({ title, description, link, location, advertiser }) => {
  if (!title || !description) return null;
  return (
    <a href={link} className="my-48 block rounded bg-orange-400 p-48">
      <Heading3>{title}</Heading3>
      <Body1>{description}</Body1>
    </a>
  );
};
