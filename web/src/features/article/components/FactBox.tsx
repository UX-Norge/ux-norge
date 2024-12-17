import { PortableText } from "@Types";
import { BlockContent } from "@Ui/Typography";
import * as React from "react";

interface IProps {
  content: PortableText;
}

export const FactBox: React.FC<IProps> = ({ content }) => {
  return (
    <div className="rounded bg-yellow-100 px-24 py-40 not-prose">
      <BlockContent blocks={content} />
    </div>
  );
};
