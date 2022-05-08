import * as React from "react";
import { BlockContent, Overline } from "@Ui/Typography";
import { ArticleImage, RelatedArticleInline } from "@Features/article";
import { Ad, PortableText } from "@Types";
import { ArticleQuote } from "./ArticleQuote";
import { printDate } from "@Lib/helpers";
import { ListAd } from "@Features/ad/components/ListAd";

interface IProps {
  body: PortableText;
  publishedAt: string;
  readTime: number;
  articleListAds: Ad[];
  articleBannerAds: Ad[];
}

export const ArticleBody: React.FC<IProps> = ({
  body,
  publishedAt,
  articleListAds,
  articleBannerAds,
  readTime,
}) => {
  const articleSerializers = {
    articleImage: ArticleImage,
    relatedArticle: RelatedArticleInline,
    blockquote: ArticleQuote,
  };
  console.log(articleListAds);

  return (
    <main className="relative mx-auto max-w-page-sm">
      <div className="prose-a:link w-prose prose p-24 prose-p:text-base prose-p:leading-relaxed">
        <Overline>{printDate(publishedAt)}</Overline>
        <Overline>{readTime} min</Overline>
        <BlockContent blocks={body} serializers={articleSerializers} />
      </div>
      {/* <div className="sticky">
        {articleListAds.map((ad) => (
          <ListAd {...ad} />
        ))}
      </div> */}
    </main>
  );
};
