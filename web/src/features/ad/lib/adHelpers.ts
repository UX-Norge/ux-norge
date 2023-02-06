import { Ad } from "@Types";
import { daysLeft } from "../../../lib/helpers";

export const validAdFilter = (ad: Ad) =>
  ad.slug?.current &&
  ad.title &&
  ad.description &&
  ad.advertiser &&
  ad.advertiser.name &&
  ad.startDate
    ? true
    : false;

export const activeFilter = (ad: Ad) =>
  !hasExpired(ad.startDate, ad.packageType?.duration, ad.deadline);

export const divideListAndBannerAds = (ads: Ad[]) => {
  return {
    listAds: ads.filter((ad) =>
      ["list", "banner+list"].includes(ad.packageType.type)
    ),
    bannerAds: ads.filter((ad) =>
      ["banner", "banner+list"].includes(ad.packageType.type)
    ),
  };
};

export const getDaysToDeadline = (deadline: string) => {
  if (!deadline) return "Ansetter fortløpende";
  return !deadline
    ? "ansetter fortløpende"
    : "Søknadsfrist er om " + daysLeft(deadline) + " dager";
};

// Add n days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const hasExpired = (
  startDate: string,
  duration: number,
  deadline: string
) => {
  let expired = false;
  if (!startDate || !duration) return false;
  if (deadline) {
    const deadlineCheck = new Date(deadline);
    // Check if deadlineCheck has passed
    if (deadlineCheck < new Date()) {
      expired = true;
    }
  }
  const now = new Date();
  const start = new Date(startDate);
  const expiry = addDays(start, duration);
  return now > expiry || start > now || expired;
};
