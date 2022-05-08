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

const getActiveAds = (ads: Ad[]) =>
  shuffle(
    ads.filter((ad) => !hasExpired(ad.startDate, ad.packageType.duration))
  );

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

export const getCoverPageAds = (ads: Ad[]) => {
  if (!ads) return { listAds: [], bannerAds: [] };

  console.log(ads);

  const activeAds = getActiveAds(ads);
  console.log(activeAds);

  return {
    listAds: activeAds.filter((ad) => ad.packageType.onCoverPage),
    bannerAds: activeAds.filter((ad) => ad.packageType.onCoverPage),
  };
};

export const getJobPageAds = (ads: Ad[]): Ad[] => {
  if (!ads) return [];
  const activeAds = getActiveAds(ads);
  return activeAds;
};
