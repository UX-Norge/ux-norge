import S from "@sanity/desk-tool/structure-builder";
import { FiFileText } from "react-icons/fi";

export default S.listItem()
  .title("Artikler")
  .icon(FiFileText)
  .child(S.documentTypeList("article").title("Artikler"));
