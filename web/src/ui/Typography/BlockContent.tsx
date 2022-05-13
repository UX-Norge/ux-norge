import * as React from "react";
import PortableText from "react-portable-text";
import { BlockContentType } from "@Types";
import { classNames } from "@Lib/helpers";

interface IProps {
  blocks: BlockContentType | undefined | object[];
  serializers?: object;
  prose?: boolean;
}

export const BlockContent: React.FC<IProps> = ({
  prose,
  blocks,
  serializers,
}) => {
  if (!blocks) return null;
  return (
    <PortableText
      content={blocks}
      serializers={{
        ...serializers,
      }}
      className={classNames({ prose: prose })}
    />
  );
};
