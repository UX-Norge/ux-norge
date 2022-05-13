import { Ad, AdPackageType } from "@Types";
import { shuffle } from "../../../lib/helpers";

// Add n days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Has data passed
export const hasExpired = (startDate: string, duration: number) => {
  if (!startDate || !duration) return false;
  const now = new Date();
  const start = new Date(startDate);
  const expiry = addDays(start, duration);
  return now > expiry || expiry < now;
};

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
