import { StructureBuilder } from "sanity/desk";
import { FiBook } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Forsiden")
    .icon(FiBook)
    .child(
      S.document()
        .schemaType("coverPage")
        .documentId("coverPage")
        .title("Forsiden")
    );
