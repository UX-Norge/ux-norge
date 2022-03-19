// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";
import { addActions } from "sanity-plugin-content-calendar/build/register";

const CustomAction = () => ({
  label: "Hello world",
  onHandle: () => {
    window.alert("👋 Hello from custom action");
  },
});

export default function resolveDocumentActions(props) {
  const actions = [...defaultResolve(props), CustomAction];
  return addActions(props, actions);
}
