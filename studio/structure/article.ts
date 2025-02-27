import { StructureBuilder } from 'sanity/structure';
import { FiBookOpen } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Artikler")
    .icon(FiBookOpen)
    .child(S.documentTypeList("article").title("Artikler"));
