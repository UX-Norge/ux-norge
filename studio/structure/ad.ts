import { StructureBuilder } from "sanity/desk";
import { FiMail, FiPackage, FiSettings, FiShoppingCart } from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Annonser")
    .icon(FiShoppingCart)
    .child(
      S.list()
        .title("Stillingsannonser")
        .items([
          S.listItem()
            .title("Stillingsannonser")
            .icon(FiMail)
            .child(S.documentTypeList("ad").title("Stillingsannonser")),
          S.listItem()
            .title("Annonsepakketyper")
            .icon(FiSettings)
            .child(
              S.documentTypeList("adPackageType").title("Annonsepakketyper")
            ),
        ])
    );
