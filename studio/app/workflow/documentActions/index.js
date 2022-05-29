// import the default document actions
import { gatsbyPreviewAction } from "sanity-plugin-gatsby-cloud-preview";
import defaultResolve from "part:@sanity/base/document-actions";
import { addActions } from "sanity-plugin-content-calendar/build/register";

export default function resolveDocumentActions(props) {
  const actions = [...defaultResolve(props)];
  return addActions(props, actions);
}
