import { Ad } from "@Types";
import { daysLeft } from "../../../lib/helpers";

export const validAdFilter = () => (ad: Ad) =>
  ad.slug?.current &&
  ad.title &&
  ad.description &&
  ad.advertiser &&
  ad.advertiser.name &&
  ad._createdAt;

export const activeFilter = (ad: Ad) =>
  !hasExpired(ad.startDate, ad.packageType?.duration);

export const divideListAndBannerAds = (ads: Ad[]) => {
  return {
    listAds: ads.filter((ad) => ad.packageType.type === "list"),
    bannerAds: ads.filter((ad) => ad.packageType.type === "banner"),
  };
};

export const getDaysToDeadline = (deadline: string) => {
  if (!deadline) return "Ansetter fortløpende";
  return !deadline
    ? "ansetter fortløpende"
    : "Søknadsfrist er om " + daysLeft(deadline);
};

// Add n days to a date
const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const hasExpired = (startDate: string, duration: number) => {
  if (!startDate || !duration) return false;
  const now = new Date();
  const start = new Date(startDate);
  const expiry = addDays(start, duration);
  return now > expiry || start > now;
};
