import defaultResolve from "part:@sanity/base/document-badges";

const CustomBadge = () => {
  return {
    label: "Custom",
    title: "Hello I am a custom document badge",
    color: "success",
  };
};

export default function resolveDocumentBadges(props) {
  const badges = [...defaultResolve(props)];
  return badges;
}
