import S from "@sanity/desk-tool/structure-builder";
import { FiFile, FiSidebar } from "react-icons/fi";

export default S.listItem()
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
            S.document().schemaType("page").documentId("jobPage").title("Jobb")
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
      ])
  );
