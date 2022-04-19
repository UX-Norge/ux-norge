import * as React from "react";
import { BlockContent } from "@Ui/Typography";
import { ArticleContent } from "@Types";
import { ArticleImage, RelatedArticleInline } from "@Features/article";

interface IProps {
  body: ArticleContent | undefined;
}

export const ArticleBody: React.FC<IProps> = ({ body }) => {
  const articleSerializers = {
    articleImage: ArticleImage,
    relatedArticle: RelatedArticleInline,
  };
  return <BlockContent blocks={body} serializers={articleSerializers} />;
};
