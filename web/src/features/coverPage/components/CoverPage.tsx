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
      | typeof remainingArticles
  ): any => source.splice(0, count) as any;

  return (
    <PageWrapper>
      <SlackBanner />
      <main className="mx-auto max-w-page">
        <div className="mt-64 grid grid-flow-col gap-48 lg:grid-cols-4">
          <div className="col-span-2">
            <ArticleThumbnail
              article={get(1, remainingArticles)[0]}
              type="feature"
            />
          </div>
          <div className="col-start-1 space-y-48">
            {get(2, remainingArticles).map((article: Article) => (
              <ArticleThumbnail article={article} type="small" />
            ))}
          </div>

          <div className="space-y-24">
            {get(4, remainingListAds).map((ad: Ad) => (
              <ListAd {...ad} />
            ))}
          </div>
        </div>
        <div>
          <BannerAd {...get(1, bannerAds)[0]} />
        </div>
        <div className="mt-64 grid grid-cols-4 gap-48">
          {get(4, remainingArticles).map((article: Article) => (
            <ArticleThumbnail article={article} type="small" />
          ))}
        </div>
        <div>
          <BannerAd {...get(1, bannerAds)[0]} />
        </div>
        <div className="grid grid-cols-4 gap-48">
          {get(5, remainingArticles).map((article: Article, index: number) => (
            <ArticleThumbnail
              article={article}
              type={index === 0 ? "feature" : "small"}
              className={classNames({ "col-span-2 row-span-2": index === 0 })}
            />
          ))}
        </div>
      </main>
    </PageWrapper>
  );
};
