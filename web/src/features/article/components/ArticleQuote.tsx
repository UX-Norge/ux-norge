import * as React from "react";

interface IProps {
  children: React.ReactNode;
}

export const ArticleQuote: React.FC<IProps> = ({ children }) => {
  return (
    <div className="not-prose relative my-56">
      <svg
        width="34"
        height="23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-16 -left-16"
        aria-labelledby="labelID"
        role="img"
      >
        <title id="labelID">Quote symbol</title>
        <path
          d="M6.048 22.764c-2.072 0-3.612-.504-4.62-1.512C.476 20.244 0 18.956 0 17.388V15.96c0-1.344.196-2.744.588-4.2a25.582 25.582 0 0 1 1.764-4.284 26 26 0 0 1 2.604-4.032A21.75 21.75 0 0 1 8.316 0h6.468c-1.736 1.736-3.192 3.444-4.368 5.124-1.12 1.624-1.96 3.444-2.52 5.46 1.456.28 2.52.924 3.192 1.932.672.952 1.008 2.072 1.008 3.36v1.512c0 1.568-.504 2.856-1.512 3.864-.952 1.008-2.464 1.512-4.536 1.512Zm18.228 0c-2.072 0-3.612-.504-4.62-1.512-.952-1.008-1.428-2.296-1.428-3.864V15.96c0-1.344.196-2.744.588-4.2a25.582 25.582 0 0 1 1.764-4.284 26 26 0 0 1 2.604-4.032A21.75 21.75 0 0 1 26.544 0h6.468c-1.736 1.736-3.192 3.444-4.368 5.124-1.12 1.624-1.96 3.444-2.52 5.46 1.456.28 2.52.924 3.192 1.932.672.952 1.008 2.072 1.008 3.36v1.512c0 1.568-.504 2.856-1.512 3.864-.952 1.008-2.464 1.512-4.536 1.512Z"
          fill="var(--color-primary-100)"
        />
      </svg>
      <blockquote className="not-prose relative z-10 text-h3 text-primary-500">
        {children}
      </blockquote>
    </div>
  );
};
