import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { Article, Author } from "@Types";
import * as React from "react";
import { AuthorThumbnail } from "../../author/components/AuthorThumbnail";
import { RelatedArticleThumbnail } from "./RelatedArticleThumbnail";

interface IProps {
  relatedArticles: Article[];
  authors: Author[];
  isSponsoredContent: boolean;
}

export const ArticleFooter: React.FC<IProps> = ({
  authors,
  relatedArticles,
  isSponsoredContent,
}) => {
  return (
    <div className="bg-primary-100 p-24 lg:p-64">
      <div className="mx-auto max-w-page-sm">
        <div className="mb-48 space-y-24">
        {!isSponsoredContent &&
          authors.map((author, index) => (
            <AuthorThumbnail {...author} key={`author-${index}`} />
          ))
        }
        </div>
        <div className="grid gap-48 md:grid-cols-3">
          {relatedArticles.map((article) => (
            <ArticleThumbnail type="small" article={article} key={article._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
