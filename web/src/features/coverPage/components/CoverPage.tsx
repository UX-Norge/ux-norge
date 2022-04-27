import * as React from "react";
import { Article } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { CoverArticleThumbnails } from "./CoverArticleThumbnails";
import { CoverArticleThumbnail } from "./CoverArticleThumbnail";

interface IProps {
  articles: Article[];
}

export const CoverPage: React.FC<IProps> = ({ articles }) => {
  return (
    <PageWrapper>
      <div className="mx-auto max-w-screen-xl">
        {articles.map((article, index) => (
          <CoverArticleThumbnail {...article} />
        ))}
      </div>
    </PageWrapper>
  );
};
