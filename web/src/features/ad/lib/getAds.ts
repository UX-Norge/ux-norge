import { Ad, AdPackageType } from "@Types";
import { shuffle } from "../../../lib/helpers";
import { hasExpired } from "./hasExpired";

type ListAndBannerAds = {
  listAds: Ad[];
  bannerAds: Ad[];
};

const emptyListAndBannerAds: ListAndBannerAds = { listAds: [], bannerAds: [] };

const getActiveAds = (ads: Ad[]) =>
  ads.filter(
    (ad) =>
      ad.slug?.current && !hasExpired(ad.startDate, ad.packageType?.duration)
  );

const divideListAndBannerAds = (ads: Ad[]) => {
  return {
    listAds: ads.filter((ad) => ad.packageType.type === "list"),
    bannerAds: ads.filter((ad) => ad.packageType.type === "banner"),
  };
};

export const getActiveAdIds = (ads: Ad[]) => {
  if (!ads) return null;
  const activeAds = getActiveAds(ads);

  const toIds = (ads: Ad[]) => ads.map((ad) => ad._id);

  return {
    articleListAds: toIds(activeAds.filter((ad) => ad.packageType?.onArticles)),
    coverListAds: toIds(activeAds.filter((ad) => ad.packageType?.onCoverPage)),
    adsPageAds: toIds(activeAds.filter((ad) => ad.packageType?.onAdsPage)),
  };
};

export const getCoverPageAds = (ads: Ad[]): ListAndBannerAds => {
  if (!ads) return emptyListAndBannerAds;

  const activeAds = getActiveAds(ads);
  return divideListAndBannerAds(
    activeAds.filter((ad) => ad.packageType?.onCoverPage)
  );
};

export const getArticlePageAds = (ads: Ad[]): ListAndBannerAds => {
  if (!ads) return emptyListAndBannerAds;

  const activeAds = getActiveAds(ads);
  return divideListAndBannerAds(
    activeAds.filter((ad) => ad.packageType?.onArticles)
  );
};

export const getJobPageAds = (ads: Ad[]): Ad[] => {
  if (!ads) return [];
  const activeAds = getActiveAds(ads);
  return activeAds.filter((ad) => ad.packageType?.onAdsPage);
};
