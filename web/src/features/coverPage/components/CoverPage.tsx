import * as React from "react";
import { Article, Ad } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { ArticleThumbnail } from "../../../components/ArticleThumbnail";
import { ListAd } from "@Features/ad/components/ListAd";
import { BannerAd } from "@Features/ad/components/BannerAd";
import { classNames } from "@Lib/helpers";
import { SlackBanner } from "./SlackBanner";

interface IProps {
  articles: Article[];
  listAds: Ad[];
  bannerAds: Ad[];
}

export const CoverPage: React.FC<IProps> = ({
  articles,
  listAds,
  bannerAds,
}) => {
  const remainingBannerAds = bannerAds;
  const remainingListAds = listAds;
  const remainingArticles = articles;

  const get = (
    count: number,
    source:
      | typeof remainingBannerAds
      | typeof remainingListAds
      | typeof remainingArticles,
    featureOnly: boolean = false
  ): any => {
    if (
      featureOnly &&
      typeof source === typeof remainingArticles &&
      count === 1
    ) {
      const articles = source as Article[];
      const indexOfFirstArticleWithImage = articles.findIndex(
        (article) => article.mainImage
      );
      return source.splice(indexOfFirstArticleWithImage, 1);
    }
    return source.splice(0, count) as any;
  };

  const TopSection = () => (
    <div className="grid grid-cols-1 gap-48 md:grid-cols-2 lg:mt-64 lg:grid-flow-col lg:grid-cols-4">
      <div className="md:col-span-2">
        <ArticleThumbnail
          article={get(1, remainingArticles, true)[0]}
          rounded="none"
          type="feature"
          className="-mx-24 lg:m-0 lg:rounded-none"
        />
      </div>
      <div className="grid gap-48 sm:grid-cols-2 md:grid-cols-1 lg:col-start-1 lg:grid-cols-1">
        {get(2, remainingArticles).map((article: Article) => (
          <ArticleThumbnail article={article} type="small" key={article._id} />
        ))}
      </div>

      <div className="space-y-24">
        {get(4, remainingListAds).map((ad: Ad) => (
          <ListAd {...ad} key={ad._id} />
        ))}
      </div>
    </div>
  );

  const FourColumn = () => (
    <div className="mt-64 mb-48 grid gap-48 md:grid-cols-2 lg:grid-cols-4">
      {get(4, remainingArticles).map((article: Article) => (
        <ArticleThumbnail article={article} type="small" key={article._id} />
      ))}
    </div>
  );

  const TwoColumnFourColumn: React.FC<{ flipped?: boolean }> = ({
    flipped = false,
  }) => (
    <div className="grid gap-y-48 gap-x-16 lg:grid-cols-4 lg:gap-x-48">
      <ArticleThumbnail
        article={get(1, remainingArticles, true)[0]}
        type={"feature"}
        className={classNames("col-span-2 row-span-2", {
          "": flipped,
        })}
      />
      {get(4, remainingArticles).map((article: Article, index: number) => (
        <ArticleThumbnail article={article} type="small" key={article._id} />
      ))}
    </div>
  );

  return (
    <PageWrapper>
      <SlackBanner />
      <main className="mx-auto max-w-page px-24">
        <TopSection />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
        <FourColumn />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
        <TwoColumnFourColumn />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
      </main>
    </PageWrapper>
  );
};
