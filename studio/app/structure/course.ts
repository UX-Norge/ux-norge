import S from "@sanity/desk-tool/structure-builder";
import { FiCalendar } from "react-icons/fi";

export default S.listItem()
  .title("Kurs")
  .icon(FiCalendar)
  .child(S.documentTypeList("course").title("Kurs"));
