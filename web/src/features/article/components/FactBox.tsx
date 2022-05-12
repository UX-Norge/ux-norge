import { PortableText } from "@Types";
import { BlockContent } from "@Ui/Typography";
import * as React from "react";

interface IProps {
  content: PortableText;
}

export const FactBox: React.FC<IProps> = ({ content }) => {
  return (
    <div className="rounded bg-yellow-100 p-24">
      <BlockContent blocks={content} />
    </div>
  );
};
