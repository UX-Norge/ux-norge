import { shuffle } from "@Lib/helpers";
import { Ad } from "@Types";
import { useEffect, useState } from "react";
import {
  activeFilter,
  divideListAndBannerAds,
  validAdFilter,
} from "./adHelpers";

type ListAndBannerAds = {
  listAds: Ad[];
  bannerAds: Ad[];
};

const emptyListAndBannerAds: ListAndBannerAds = { listAds: [], bannerAds: [] };

const useActiveAds = (ads: Ad[], filtering: (ad: Ad) => boolean): Ad[] => {
  const [activeAds, setActiveAds] = useState<Ad[]>([]);

  useEffect(() => {
    setActiveAds(
      shuffle(ads.filter(validAdFilter).filter(activeFilter).filter(filtering))
    );
  }, []);

  return activeAds;
};

export const useCoverPageAds = (ads: Ad[]): ListAndBannerAds =>
  divideListAndBannerAds(
    useActiveAds(ads, (ad: Ad) => ad.packageType?.onCoverPage)
  );

export const useArticlePageAds = (ads: Ad[]): ListAndBannerAds =>
  divideListAndBannerAds(
    useActiveAds(ads, (ad: Ad) => ad.packageType?.onArticles)
  );

export const useJobPageAds = (ads: Ad[]): Ad[] =>
  useActiveAds(ads, (ad: Ad) => ad.packageType?.onAdsPage) as Ad[];
