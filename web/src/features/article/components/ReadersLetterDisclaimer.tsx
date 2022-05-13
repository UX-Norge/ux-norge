import { Body1 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface IProps {}

export const ReadersLetterDisclaimer: React.FC<IProps> = ({}) => {
  const { sanityReadersLetter } = useStaticQuery(graphql`
    query {
      sanityReadersLetter(_id: { eq: "readersLetter" }) {
        title
        text
      }
    }
  `);
  if (!sanityReadersLetter) return null;
  const { title, text } = sanityReadersLetter;
  return (
    <div className="not-prose my-16 rounded-xs bg-blue-100 p-24">
      <p className="text-h4">{title}</p>
      <Body1>{text}</Body1>
    </div>
  );
};
