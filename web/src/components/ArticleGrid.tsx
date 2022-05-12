import { Article } from "@Types";
import * as React from "react";
import { ArticleThumbnail } from "./ArticleThumbnail";

interface IProps {
  articles: Article[];
}

export const ArticleGrid: React.FC<IProps> = ({ articles }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-24">
      {articles.map((article) => (
        <ArticleThumbnail article={article} type="small" />
      ))}
    </div>
  );
};
