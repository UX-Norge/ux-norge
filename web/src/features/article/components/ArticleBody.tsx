import * as React from "react";
import { BlockContent, Overline } from "@Ui/Typography";
import { ArticleImage, RelatedArticleInline } from "@Features/article";
import { Ad, Article } from "@Types";
import { ArticleQuote } from "./ArticleQuote";
import { printDate } from "@Lib/helpers";
import { blockContentToPlainText } from "react-portable-text";
import { BannerAd } from "@Features/ad/components/BannerAd";
import { FactBox } from "./FactBox";
import { ReadersLetterDisclaimer } from "./ReadersLetterDisclaimer";

interface IProps {
  readTime: number;
  articleListAds: Ad[];
  articleBannerAds: Ad[];
}

const insertBannerAds = (blocks: any[], bannerAds: Ad[]) => {
  const bannerAdLength = bannerAds.length;
  const titleIndexes = blocks
    .map((item, index) => (item.style?.includes("h2") ? index : null))
    .filter((index) => index)
    .splice(1);

  for (let i = 0; i < bannerAdLength && i < titleIndexes.length; i++) {
    const ad = {
      _key: `ad-${i}`,
      _type: "bannerAd",
      ...bannerAds[i],
    };
    const newIndex = titleIndexes[i];
    const shift = i > 0 ? 1 : 0;
    newIndex && blocks.splice(newIndex + shift, 0, ad);
  }
  return blocks;
};

export const ArticleBody: React.FC<
  IProps & Pick<Article, "publishedAt" | "body" | "isReadersLetter">
> = ({
  isReadersLetter,
  body,
  publishedAt,
  articleListAds,
  articleBannerAds,
}) => {
  const articleSerializers = {
    articleImage: ArticleImage,
    relatedArticle: RelatedArticleInline,
    blockquote: ArticleQuote,
    bannerAd: BannerAd,
    factBox: FactBox,
  };

  const readTime = Math.round(
    blockContentToPlainText(body).split(" ").length / 200
  );
  const bodyWithAds = insertBannerAds(body, articleBannerAds);

  return (
    <main className="relative mx-auto mt-56 max-w-page-sm">
      <div className="mx-auto max-w-prose p-24 lg:m-0">
        <Overline className="text-base text-primary-500">
          {printDate(publishedAt)}
        </Overline>
        <Overline>{readTime} min</Overline>
        {isReadersLetter && <ReadersLetterDisclaimer />}
        <div className="prose-a:link w-prose prose prose-p:text-base prose-p:leading-relaxed">
          <BlockContent blocks={bodyWithAds} serializers={articleSerializers} />
        </div>
      </div>
      {/* <div className="sticky">
        {articleListAds.map((ad) => (
          <ListAd {...ad} />
        ))}
      </div> */}
    </main>
  );
};
