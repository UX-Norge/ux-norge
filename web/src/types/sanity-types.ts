import type {
  SanityReference,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageAsset,
} from "sanity-codegen";
import {
  Article,
  CoverAds,
  CoverArticles,
  CoverCollections,
} from "./sanity-generated-types";

export type SanityImage = {
  _type: "image";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

// export type ArticleThumbnail = {
//   _type: "articleThumbnail";
//   article: Pick<
//     Article,
//     "title" | "description" | "slug" | "mainImage" | "category"
//   >;
// };

export type CoverBlock = CoverAds | CoverArticles | CoverCollections;

export { BlockContent as BlockContentType } from "./sanity-generated-types";
