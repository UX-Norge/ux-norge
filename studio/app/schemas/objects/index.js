import articleContent from "./article/articleContent";
import articleImage from "./article/articleImage";
import divider from "./article/divider";
import articleThumbnail from "./articleThumbnail";
import blockContent from "./blockContent";
import { coverAds, coverArticles, coverCollections } from "./coverBlocks";
import invoiceInformation from "./invoiceInformation";
import relatedArticle from "./relatedArticle";
import simpleBlockContent from "./simpleBlockContent";

export default [
  blockContent,
  simpleBlockContent,
  articleContent,
  articleImage,
  relatedArticle,
  coverArticles,
  coverAds,
  coverCollections,
  articleThumbnail,
  divider,
];
