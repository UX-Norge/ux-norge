import React from "react";

const ArticleImageRenderer = React.forwardRef((props, ref) => {
  console.log(props);
  return "bilde";
});

export default ArticleImageRenderer;
