import S from "@sanity/desk-tool/structure-builder";
import { FiFile } from "react-icons/fi";

export default S.listItem()
  .title("Dokumenter")
  .icon(FiFile)
  .child(S.documentTypeList("doc").title("Dokumenter"));
