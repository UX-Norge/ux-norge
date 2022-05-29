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
import { ListAd } from "@Features/ad/components/ListAd";

interface IProps {
  readTime: number;
  articleListAds: Ad[];
  articleBannerAds: Ad[];
}

const insertBannerAds = (blocks: any[], bannerAds: Ad[]) => {
  const bannerAdLength = bannerAds.length;
  const titleIndexes = blocks
    .reduce(
      (out, item, index) =>
        item.style?.includes("h2") ? out.concat(index) : out,
      []
    )
    .splice(1) // Removes the first headline
    .filter((_, index: number) => index % 2 === 0); // Every other title

  console.log(titleIndexes);

  for (let i = 0; i < bannerAdLength && i < titleIndexes.length; i++) {
    const ad = {
      _key: `ad-${i}`,
      _type: "bannerAd",
      ...bannerAds[i],
    };
    const newIndex = titleIndexes[i];
    const shift = i; // Shift the index by the number of banner ads previously inserted
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
  console.log(body);

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
    <main className="relative mx-auto mt-56 grid max-w-[950px] grid-cols-[65ch_1fr] gap-24">
      <div className="relative mx-auto max-w-prose p-24 lg:m-0">
        <Overline className="text-base text-primary-500">
          {printDate(publishedAt)}
        </Overline>
        <Overline>{readTime} min</Overline>
        {isReadersLetter && <ReadersLetterDisclaimer />}
        <div className="prose-a:link w-prose prose prose-p:text-base prose-p:leading-relaxed">
          <BlockContent blocks={bodyWithAds} serializers={articleSerializers} />
        </div>
      </div>
      <div className="hidden w-full space-y-48 lg:block">
        {articleListAds.map((ad) => (
          <ListAd {...ad} />
        ))}
      </div>
    </main>
  );
};
