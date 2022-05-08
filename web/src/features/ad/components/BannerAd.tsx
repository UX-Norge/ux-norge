import { Ad } from "@Types";
import { Body1, Heading3 } from "@Ui/Typography";
import * as React from "react";

export const BannerAd: React.FC<
  Pick<Ad, "title" | "text" | "link" | "location" | "advertiser">
> = ({ title, text, link, location, advertiser }) => {
  return (
    <a href={link} className="my-48 block rounded bg-accent-2-300 p-48">
      <Heading3>{title}</Heading3>
      <Body1>{text}</Body1>
    </a>
  );
};
