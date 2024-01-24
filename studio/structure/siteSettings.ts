import { StructureBuilder } from "sanity/desk";
import {
  FiMessageSquare,
  FiSettings,
  FiTag,
  FiTwitter,
  FiUsers,
} from "react-icons/fi";

export default (S: StructureBuilder) =>
  S.listItem()
    .title("Innstillinger")
    .icon(FiSettings)
    .child(
      S.list()
        .title("Innstillinger")
        .items([
          S.listItem()
            .title("Sideinnstillinger")
            .icon(FiSettings)
            .child(
              S.document()
                .schemaType("siteSettings")
                .documentId("siteSettings")
                .title("Sideinnstillinger")
            ),
          S.divider(),
          S.listItem()
            .title("Forfattere")
            .icon(FiUsers)
            .child(S.documentTypeList("author").title("Forfattere")),
          S.listItem()
            .title("Kategorier")
            .icon(FiTag)
            .child(S.documentTypeList("category").title("category")),
          S.listItem()
            .title("Sosiale medier")
            .icon(FiTwitter)
            .child(S.documentTypeList("socialMedia").title("Sosiale medier")),
          S.divider(),
          S.listItem()
            .title("Nyhetsbrevbanner")
            .icon(FiMessageSquare)
            .child(
              S.document()
                .schemaType("newsletterSignupForm")
                .documentId("newsletterSignupForm")
                .title("Nyhetsbrevbanner")
            ),
          S.listItem()
            .title("Slackbanner")
            .icon(FiMessageSquare)
            .child(
              S.document()
                .schemaType("slackBanner")
                .documentId("slackBanner")
                .title("Slackbanner")
            ),
          S.divider(),
          S.listItem()
            .title("Diskuter artikkelen i Slack")
            .icon(FiMessageSquare)
            .child(
              S.document()
                .schemaType("discussInSlack")
                .documentId("discussInSlack")
                .title("Diskuter i Slacken")
            ),
          S.listItem()
            .title("Nominer til ukens designer")
            .icon(FiMessageSquare)
            .child(
              S.document()
                .schemaType("nominateBanner")
                .documentId("nominateBanner")
                .title("Nominer til ukes designer")
            ),
          S.listItem()
            .title("Leserinnlegg")
            .icon(FiMessageSquare)
            .child(
              S.document()
                .schemaType("readersLetter")
                .documentId("readersLetter")
                .title("Leserinnlegg")
            ),
          S.listItem()
            .title("Annonsørinnhold")
            .icon(FiMessageSquare)
            .child(
              S.document()
                .schemaType("sponsoredContentLetter")
                .documentId("sponsoredContentLetter")
                .title("Annonsørinnhold")
            ),
          S.divider(),
          S.listItem()
            .title("Footer")
            .child(
              S.document()
                .schemaType("footer")
                .documentId("footer")
                .title("Footer")
            ),
          S.listItem()
            .title("Samarbeidspartnerseksjon")
            .child(
              S.document()
                .schemaType("partnerBanner")
                .documentId("partnerBanner")
                .title("Samarbeidspartnerseksjon")
            ),
        ])
    );
