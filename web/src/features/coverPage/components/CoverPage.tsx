import * as React from "react";
import { CoverBlock } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { CoverArticleThumbnails } from "./CoverArticleThumbnails";

interface IProps {
  blocks: CoverBlock[];
}

export const CoverPage: React.FC<IProps> = ({ blocks }) => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-screen-xl">
        {blocks.map((block: CoverBlock, index) => {
          const key = `block-${index}`;
          switch (block._type) {
            case "coverAds":
              return null;
            case "coverCollections":
              return null;
            case "coverArticles":
              return (
                <CoverArticleThumbnails
                  list={block.list}
                  type={block.layout}
                  key={key}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </PageWrapper>
  );
};
