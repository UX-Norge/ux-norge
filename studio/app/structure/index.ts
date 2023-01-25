import S from "@sanity/desk-tool/structure-builder";
import ad from "./ad";
import article from "./article";
import company from "./company";
import course from "./course";
import cover from "./cover";
import dokumenter from "./dokumenter";
import newsletter from "./newsletter";
import page from "./page";
import siteSettings from "./siteSettings";

const debug = false;

const studioItems = debug
  ? S.documentTypeListItems()
  : [
      siteSettings,
      cover,
      article,
      page,
      newsletter,
      ad,
      dokumenter,
      company,
      course,
    ];

export default () => S.list().title("Content").items(studioItems);
