import * as React from "react";
import PortableText from "react-portable-text";
import { BlockContentType } from "@Types";

interface IProps {
  blocks: BlockContentType | undefined | object[];
  serializers?: object;
}

export const BlockContent: React.FC<IProps> = ({ blocks, serializers }) => {
  if (!blocks) return null;
  return (
    <PortableText
      content={blocks}
      serializers={{
        ...serializers,
      }}
    />
  );
};
