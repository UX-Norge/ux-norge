import { StructureBuilder } from "sanity/structure";
import { FiFile } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Sider")
    .icon(FiFile)
    .child(
      S.documentList()
        .id('pages-docs')
        .title('Sider')
        .filter(`_type in ['page', 'doc']`)
        .defaultOrdering([{ field: '_type', direction: 'desc' }])
    );
