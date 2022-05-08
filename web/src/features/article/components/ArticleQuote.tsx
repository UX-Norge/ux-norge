import * as React from "react";

interface IProps {
  text: string;
}

export const ArticleQuote: React.FC<IProps> = ({ children }) => {
  return (
    <div className="not-prose my-32">
      <blockquote className="not-prose text-h4 text-accent-5-500">
        {children}
      </blockquote>
    </div>
  );
};
