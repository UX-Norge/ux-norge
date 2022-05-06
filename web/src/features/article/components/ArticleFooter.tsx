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
      <div className="mx-auto max-w-page">
        {authors.map((author) => (
          <AuthorThumbnail {...author} />
        ))}
        <div className="space-y-32">
          {relatedArticles.map((article) => (
            <RelatedArticleThumbnail {...article} />
          ))}
        </div>
      </div>
    </div>
  );
};
