import * as React from "react";
import { BlockContent, Overline } from "@Ui/Typography";
import { ArticleImage, RelatedArticleInline } from "@Features/article";
import { PortableText } from "@Types";
import { ArticleQuote } from "./ArticleQuote";
import { printDate } from "@Lib/helpers";

interface IProps {
  body: PortableText;
  publishedAt: string;
  readTime: number;
}

export const ArticleBody: React.FC<IProps> = ({
  body,
  publishedAt,
  readTime,
}) => {
  const articleSerializers = {
    articleImage: ArticleImage,
    relatedArticle: RelatedArticleInline,
    blockquote: ArticleQuote,
  };
  return (
    <main className="mx-auto max-w-page">
      <div className="prose-p:font-serif prose p-24 prose-p:text-base">
        <Overline>{printDate(publishedAt)}</Overline>
        <BlockContent blocks={body} serializers={articleSerializers} />
      </div>
    </main>
  );
};
