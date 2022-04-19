import React from "react";
import { withDocument } from "part:@sanity/form-builder";
import { useEffect } from "react";
import { TextInput } from "@sanity/ui";
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent";

const EditorMessage = React.forwardRef((props, ref) => {
  console.log(props);
  set("true");
  return (
    <div>
      <p>Gyldig til og med: </p>
      <TextInput ref={ref} value={false} readOnly={true} />
    </div>
  );
});

export default withDocument(EditorMessage);
