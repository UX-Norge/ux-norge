import S from "@sanity/desk-tool/structure-builder";
import ad from "./ad";
import article from "./article";
import company from "./company";
import cover from "./cover";
import dokumenter from "./dokumenter";
import newsletter from "./newsletter";
import siteSettings from "./siteSettings";

const debug = false;

const studioItems = debug
  ? S.documentTypeListItems()
  : [siteSettings, cover, article, newsletter, ad, dokumenter, company];

export default () => S.list().title("Content").items(studioItems);
