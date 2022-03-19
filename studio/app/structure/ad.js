import S from "@sanity/desk-tool/structure-builder";
import { FiMail, FiPackage, FiSettings, FiShoppingCart } from "react-icons/fi";

export default S.listItem()
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
            S.documentTypeList("ad.packageType").title("Annonsepakketyper")
          ),
      ])
  );
