import * as React from "react";
import PortableText from "react-portable-text";
import { BlockContent as BlockContentType } from "../types/sanity-types";
import ArticleImage from "./ArticleImage";

interface IProps {
  blocks: BlockContentType | undefined | object[];
}

const BlockContent: React.FC<IProps> = ({ blocks }) => {
  if (!blocks) return null;
  return (
    <PortableText
      content={blocks}
      serializers={{
        articleImage: ArticleImage,
      }}
    />
  );
};

export default BlockContent;
