import { Ad, AdPackageType } from "@Types";

// Add n days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Randomize order of array
const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Has data passed
const hasExpired = (startDate: string, duration: number) => {
  const now = new Date();
  const start = new Date(startDate);
  const expiry = addDays(start, duration);
  return now > expiry || expiry < now;
};

export const getAds = (allAds: { node: Ad }[]) => {
  // Remove all expired and not started ads, then shuffle
  allAds = shuffle(
    allAds.filter(
      ({ node: ad }) =>
        ad.startDate &&
        ad.packageType?.duration &&
        !hasExpired(ad.startDate, ad.packageType.duration)
    )
  );
  const toIds = (ads: { node: Ad }[]) => ads.map(({ node: ad }) => ad._id);
  return {
    articleListAds: toIds(
      allAds.filter(({ node: ad }) => ad.packageType?.onArticles)
    ),
    coverListAds: toIds(
      allAds.filter(({ node: ad }) => ad.packageType?.onCoverPage)
    ),
    adsPageAds: toIds(
      allAds.filter(({ node: ad }) => ad.packageType?.onAdsPage)
    ),
  };
};
