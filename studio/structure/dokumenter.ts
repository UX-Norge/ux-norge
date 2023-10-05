import { StructureBuilder } from "sanity/desk";
import { FiFile } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Dokumenter")
    .icon(FiFile)
    .child(S.documentTypeList("doc").title("Dokumenter"));
