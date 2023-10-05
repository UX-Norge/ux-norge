import { StructureBuilder } from "sanity/desk";
import { FiMail } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Nyhetsbrev")
    .icon(FiMail)
    .child(S.documentTypeList("newsletter").title("Nyhetsbrev"));
