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
  console.log(publishedAt);

  return (
    <main className="mx-auto max-w-page-sm">
      <div className="prose max-w-prose p-24 prose-p:text-base prose-p:leading-relaxed">
        <Overline>{printDate(publishedAt)}</Overline>
        <Overline>{readTime} min</Overline>
        <BlockContent blocks={body} serializers={articleSerializers} />
      </div>
    </main>
  );
};
