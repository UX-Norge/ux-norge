import * as React from "react";
import { Block } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { FullWidthArticleThumbnail } from "./FullWidthArticleThumbnail";
import { title } from "process";
import { HalfWidthArticleThumbnail } from "./HalfWidthArticleThumbnail";
import { ListArticleThumbnail } from "./ListArticleThumbnail";

interface IProps {
  blocks: Block[];
}

export const CoverPage: React.FC<IProps> = ({ blocks }) => {
  const coverSerializer = (block: Block) => {
    if (block._type === "coverArticles") {
      //
      if (block.layout === "fullWidth") {
        return block.list?.map(({ article }) => (
          <FullWidthArticleThumbnail {...article} />
        ));
      }
      if (block.layout === "halfWidth") {
        return (
          <div className="grid grid-cols-2">
            {block.list?.map(({ article }) => (
              <HalfWidthArticleThumbnail {...article} />
            ))}
          </div>
        );
      }
      if (block.layout === "list") {
        return (
          <div className="mb-24">
            {block.list?.map(({ article }) => (
              <ListArticleThumbnail {...article} />
            ))}
          </div>
        );
      }
    }

    if (block._type === "coverCollections") {
    }

    if (block._type === "coverAds") {
    }
    return null;
  };
  return (
    <PageWrapper>
      <div className="mx-auto max-w-xl">
        {blocks.map((block) => coverSerializer(block))}
      </div>
    </PageWrapper>
  );
};
