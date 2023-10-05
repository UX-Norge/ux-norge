import { StructureBuilder } from "sanity/desk";
import { FiBriefcase, FiFileText } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Bedrifter")
    .icon(FiBriefcase)
    .child(S.documentTypeList("company").title("Bedrifter"));
