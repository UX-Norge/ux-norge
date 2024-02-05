import { Body1 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface IProps {}

export const SponsoredContentDisclaimer: React.FC<IProps> = ({}) => {
  const { sanitySponsoredContent } = useStaticQuery(graphql`
    query {
      sanitySponsoredContent(_id: { eq: "sponsoredContent" }) {
        title
        text
      }
    }
  `);
  if (!sanitySponsoredContent) return null;
  const { title, text } = sanitySponsoredContent;
  return (
    <div className="not-prose my-16 rounded-xs bg-blue-100 p-24">
      <p className="text-h4">{title}</p>
      <Body1>{text}</Body1>
    </div>
  );
};
