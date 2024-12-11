import { StructureBuilder } from "sanity/desk";
import { FiFile, FiSidebar } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Sider")
    .icon(FiSidebar)
    .child(
      S.list()
        .title("Sider")
        .items([
          S.listItem()
            .title("Jobb")
            .icon(FiFile)
            .child(
              S.document()
                .schemaType("page")
                .documentId("jobPage")
                .title("Jobb")
            ),
          S.listItem()
            .title("Kurs")
            .icon(FiFile)
            .child(
              S.document()
                .schemaType("page")
                .documentId("coursePage")
                .title("Kurs")
            ),
          S.listItem()
            .title("Dokumenter")
            .icon(FiFile)
            .child(
              S.documentTypeList("doc")
              .title("Dokumenter")
            )
        ])
    );
