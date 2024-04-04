import { Company } from "@Types";
import { Body1 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface IProps {
  company: Company
}

export const SponsoredContentDisclaimer: React.FC<IProps> = ({
  company
}) => {
  const { sanitySponsoredContent } = useStaticQuery(graphql`
    query {
      sanitySponsoredContent(_id: { eq: "sponsoredContent" }) {
        title
        text
      }
    }
  `);
  if (!sanitySponsoredContent) return null;
  const { title, text} = sanitySponsoredContent;
  return (
    <div className="not-prose my-16 rounded-xs bg-blue-100 p-24">
      <Body1>{text} {company.name}</Body1>
    </div>
  );
};
