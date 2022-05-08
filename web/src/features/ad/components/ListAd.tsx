import { Link } from "@Components/Link";
import { Ad } from "@Types";
import { Heading4, Overline } from "@Ui/Typography";
import * as React from "react";

export const ListAd: React.FC<
  Pick<Ad, "title" | "link" | "text" | "jobType" | "advertiser" | "location">
> = ({ title, link, text, advertiser, location }) => {
  return (
    <a href={link} tabIndex="0">
      <Heading4>{title}</Heading4>
      <Overline>
        {advertiser.name} • {location}
      </Overline>
    </a>
  );
};
