import S from "@sanity/desk-tool/structure-builder";
import { FiMail } from "react-icons/fi";

export default S.listItem()
  .title("Nyhetsbrev")
  .icon(FiMail)
  .child(S.documentTypeList("newsletter").title("Nyhetsbrev"));
