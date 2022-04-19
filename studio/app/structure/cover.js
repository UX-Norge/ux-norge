import S from "@sanity/desk-tool/structure-builder";
import { FiBook } from "react-icons/fi";

export default S.listItem()
  .title("Forsiden")
  .icon(FiBook)
  .child(
    S.document()
      .schemaType("coverPage")
      .documentId("coverPage")
      .title("Forsiden")
  );
