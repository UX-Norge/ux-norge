import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { Article, Author } from "@Types";
import * as React from "react";
import { AuthorThumbnail } from "./AuthorThumbnail";
import { RelatedArticleThumbnail } from "./RelatedArticleThumbnail";

interface IProps {
  relatedArticles: Article[];
  authors: Author[];
}

export const ArticleFooter: React.FC<IProps> = ({
  authors,
  relatedArticles,
}) => {
  return (
    <div className="bg-primary-100 p-24 lg:p-64">
      <div className="mx-auto max-w-page-sm">
        {authors.map((author, index) => (
          <AuthorThumbnail {...author} key={`author-${index}`} />
        ))}
        <div className="space-y-32">
          {relatedArticles.map((article) => (
            <ArticleThumbnail type="list" article={article} key={article._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
