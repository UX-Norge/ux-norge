import { StructureBuilder } from 'sanity/structure';
import { FiCalendar } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Kurs")
    .icon(FiCalendar)
    .child(S.documentTypeList("course").title("Kurs"));
