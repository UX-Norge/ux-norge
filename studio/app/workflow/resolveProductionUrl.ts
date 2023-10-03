import { getRoute } from "../../../web/src/lib/getRoute";
import { RouteTypes } from "../../../types";

export default function resolveProductionUrl(document) {
  const { slug, _type } = document;
  const toType = (type: string): RouteTypes =>
    ({
      article: "article",
      doc: "page",
      ad: "ad",
    }[type]);
  return `https://preview-uxnorge.netlify.app${getRoute(
    toType(_type),
    slug.current
  )}`;
}
