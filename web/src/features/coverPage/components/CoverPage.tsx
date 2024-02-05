import * as React from "react";
import { Article, Ad } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { ArticleThumbnail } from "../../../components/ArticleThumbnail";
import { ListAd } from "@Features/ad/components/ListAd";
import { BannerAd } from "@Features/ad/components/BannerAd";
import { classNames, pushSponsoredContentDownOnFrontPage } from "@Lib/helpers";
import { SlackBanner } from "./SlackBanner";
import { Link } from "@Components/Link";

interface IProps {
  articles: Article[];
  listAds: Ad[];
  bannerAds: Ad[];
}

const ArrowLeftIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
      <path
      d="M22.7199 12.7319C22.8993 12.5525 23 12.3093 23 12.0556C23 11.802 22.8993 11.5588 22.7199 11.3794L16.6326 5.29202C16.5443 5.20066 16.4388 5.12779 16.3221 5.07766C16.2054 5.02753 16.0799 5.00114 15.9529 5.00004C15.8259 4.99893 15.6999 5.02313 15.5824 5.07123C15.4648 5.11932 15.358 5.19035 15.2682 5.28016C15.1784 5.36997 15.1074 5.47677 15.0593 5.59433C15.0112 5.71188 14.987 5.83783 14.9881 5.96484C14.9892 6.09185 15.0156 6.21737 15.0657 6.33407C15.1158 6.45077 15.1887 6.55631 15.28 6.64455L20.6911 12.0556L15.28 17.4667C15.1058 17.6471 15.0094 17.8888 15.0116 18.1396C15.0138 18.3904 15.1143 18.6303 15.2917 18.8076C15.469 18.985 15.709 19.0856 15.9598 19.0877C16.2106 19.0899 16.4522 18.9935 16.6326 18.8193L22.7199 12.7319ZM1 13.0122H22.0437V11.0991H1V13.0122Z"
      fill="white"
      />
  </svg>
);

export const CoverPage: React.FC<IProps> = ({
  articles,
  listAds,
  bannerAds,
}) => {
  const remainingBannerAds = bannerAds;
  const remainingListAds = listAds;
  const remainingArticles = pushSponsoredContentDownOnFrontPage(articles);
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
        <Link
          path="annonse"
          type="page"
          className="block space-y-4 bg-green-600 hover:bg-green-500 text-white py-16 px-16 rounded-sm cursor-pointer"
        >
          <p className="text-sm">Leter du etter designer?</p>
          <div className="flex gap-16">
            <p className="font-bold">Legg ut stillingsannonse her!</p>
            <ArrowLeftIcon />
          </div>
        </Link>
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
      <main className="mx-auto max-w-page px-24 pb-24">
        <TopSection />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
        <FourColumn />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
        <TwoColumnFourColumn />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
        <FourColumn />
        <BannerAd {...get(1, bannerAds)[0]} onHomepage />
        <TwoColumnFourColumn />
      </main>
    </PageWrapper>
  );
};
