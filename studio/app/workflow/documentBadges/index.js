import defaultResolve from "part:@sanity/base/document-badges";
import { addBadge } from "sanity-plugin-content-calendar/build/register";

const CustomBadge = () => {
  return {
    label: "Custom",
    title: "Hello I am a custom document badge",
    color: "success",
  };
};

export default function resolveDocumentBadges(props) {
  const badges = [...defaultResolve(props)];
  return addBadge(props, badges);
}
