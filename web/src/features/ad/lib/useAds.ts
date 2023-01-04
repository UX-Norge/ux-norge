import { flatten, removeDuplicates, shuffle } from "@Lib/helpers";
import { Ad } from "@Types";
import React, { useEffect, useState } from "react";
import {
  activeFilter,
  divideListAndBannerAds,
  validAdFilter,
} from "./adHelpers";

type ListAndBannerAds = {
  listAds: Ad[];
  bannerAds: Ad[];
};

const useActiveAds = (ads: Ad[], filtering?: (ad: Ad) => boolean): Ad[] => {
  const [activeAds, setActiveAds] = useState<Ad[]>([]);

  useEffect(() => {
    let filtered = ads.filter(validAdFilter).filter(activeFilter);
    if (filtering) filtered = filtered.filter(filtering);
    setActiveAds(shuffle(filtered));
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

export const ALL_STRING = "Alle";

export const useJobPageAds = (ads: Ad[]) => {
  const activeAds = useActiveAds(ads) as Ad[];
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [locations, setLocations] = React.useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = React.useState<string[]>([
    ALL_STRING,
  ]);
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([
    ALL_STRING,
  ]);

  React.useEffect(() => {
    setFilteredAds(
      activeAds.filter((ad) => {
        const jobTypeMatch = selectedJobTypes.includes(ALL_STRING)
          ? true
          : selectedJobTypes.includes(ad.jobType);
        const locationMatch = selectedLocations.includes(ALL_STRING)
          ? true
          : ad.location.some(({ name }) => selectedLocations.includes(name));
        return jobTypeMatch && locationMatch;
      })
    );
  }, [selectedJobTypes, selectedLocations, activeAds]);

  useEffect(() => {
    setLocations(
      removeDuplicates(
        flatten(
          activeAds.map((ad) => ad.location.map((location) => location.name))
        ),
        true
      )
    );
    setJobTypes(
      removeDuplicates(
        activeAds.map((ad) => ad.jobType),
        true
      )
    );
  }, [activeAds]);

  return {
    locations,
    jobTypes,
    setLocations,
    filteredAds,
    selectedLocations,
    selectedJobTypes,
    setSelectedJobTypes,
    setSelectedLocations,
  };
};
