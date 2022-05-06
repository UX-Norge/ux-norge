import * as React from "react";
import { Article, Ad } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { CoverArticleThumbnail } from "./CoverArticleThumbnail";
import { useEffect } from "react";

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
  const scoreLayout = (layout: string[]): number => {
    return 100;
  };

  const toGridAreas = (layout: string[][]): string => {
    return layout.map((row) => '"' + row.join(" ") + '"').join(" ");
  };
  // 20 empty items
  const coverPageGrid = [
    ["article", "feature", "feature", "adList"],
    [".", "feature", "feature", "adList"],
    [".", "feature", "feature", "adList"],
    [".", "feature", "feature", "adList"],
    [".", "feature", "feature", "adList"],
    [".", "feature", "feature", "adList"],
  ];

  const setLayout = () => {
    let root = document.documentElement;
    root.style.setProperty(
      "--cover-page-desktop-layout",
      toGridAreas(coverPageGrid)
    );
  };

  useEffect(() => {
    setLayout();
  }, []);

  return (
    <PageWrapper>
      <div
        className="mx-auto grid max-w-screen-2xl space-y-8"
        style={{ gridTemplateAreas: "var(--cover-page-layout)" }}
      >
        {articles.map((article) => (
          <div
            className="h-128 w-full bg-gray-200"
            style={{
              gridArea: article.isFeature ? "feature" : "article",
              backgroundColor: article.isFeature
                ? "var(--color-primary-400)"
                : "var(--color-neutral-200)",
            }}
          ></div>
        ))}
        <div
          className="h-128 w-full bg-accent-3-400"
          style={{ gridArea: "adList" }}
        ></div>
      </div>
      <div className="mx-auto grid max-w-screen-xl grid-cols-[repeat(auto-fit,minmax(300px,_1fr))] gap-16">
        {articles.map((article, index) => (
          <CoverArticleThumbnail {...article} />
        ))}
      </div>
      <ul>
        {listAds.map((ad, index) => (
          <li key={index}>{ad.title}</li>
        ))}
      </ul>
    </PageWrapper>
  );
};
