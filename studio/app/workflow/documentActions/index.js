// import the default document actions
import defaultResolve from "part:@sanity/base/document-actions";
import { ScheduleAction } from "@sanity/scheduled-publishing";

export default function resolveDocumentActions(props) {
  // Default document actions
  const defaultActions = defaultResolve(props);

  // Show the schedule button on `movie` documents only
  if (["article", "ad"].includes(props.type)) {
    // Add our schedule action AFTER the first action (publish, by default)
    // to ensure it sits at the top of our document context menu.
    return [
      ...defaultActions.slice(0, 1),
      ScheduleAction,
      ...defaultActions.slice(1),
    ];
  }

  // Finally, return default actions for all other document types
  return defaultActions;
}
