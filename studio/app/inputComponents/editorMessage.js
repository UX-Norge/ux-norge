import React from "react";
import { withDocument } from "part:@sanity/form-builder";
import { useEffect } from "react";

const EditorMessage = React.forwardRef((props, ref) => {
  console.log(props);
  return (
    <div>
      <p>Gyldig til og med: </p>
    </div>
  );
});

export default withDocument(EditorMessage);
