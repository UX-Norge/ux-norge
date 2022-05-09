import { Ad } from "@Types";
import { BlockContent, Body1, Heading3 } from "@Ui/Typography";
import * as React from "react";
import PortableText from "react-portable-text";

export const BannerAd: React.FC<
  Pick<Ad, "title" | "text" | "link" | "location" | "advertiser">
> = ({ title, text, link, location, advertiser }) => {
  return (
    <a href={link} className="my-48 block rounded bg-green-300 p-48">
      <Heading3>{title}</Heading3>
      <BlockContent blocks={text} />
    </a>
  );
};
