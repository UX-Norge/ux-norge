import { StructureBuilder } from 'sanity/structure';
import ad from "./ad";
import article from "./article";
import company from "./company";
import course from "./course";
import cover from "./cover";
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
      company(S),
      course(S),
    ]);
