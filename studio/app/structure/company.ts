import S from "@sanity/desk-tool/structure-builder";
import { FiBriefcase, FiFileText } from "react-icons/fi";

export default S.listItem()
  .title("Bedrifter")
  .icon(FiBriefcase)
  .child(S.documentTypeList("company").title("Bedrifter"));
