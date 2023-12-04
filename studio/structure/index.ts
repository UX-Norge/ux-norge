import { StructureBuilder } from "sanity/desk";
import ad from "./ad";
import article from "./article";
import company from "./company";
import course from "./course";
import cover from "./cover";
import dokumenter from "./dokumenter";
import newsletter from "./newsletter";
import page from "./page";
import siteSettings from "./siteSettings";

export default (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      siteSettings(S),
      cover(S),
      article(S),
      page(S),
      newsletter(S),
      ad(S),
      dokumenter(S),
      company(S),
      course(S),
    ]);
