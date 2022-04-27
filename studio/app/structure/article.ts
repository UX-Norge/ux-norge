import S from "@sanity/desk-tool/structure-builder";
import { FiBookOpen } from "react-icons/fi";

export default S.listItem()
  .title("Artikler")
  .icon(FiBookOpen)
  .child(S.documentTypeList("article").title("Artikler"));
