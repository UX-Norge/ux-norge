import { SanitySlug } from "@Types";
import * as React from "react";
import { Link, RouteTypes } from "@Components/Link";

interface IProps {
  numPages: number;
  slug: SanitySlug;
  type: RouteTypes;
}

export const PaginationRow: React.FC<IProps> = ({
  currentPage,
  numPages,
  slug,
  type,
}) => {
  return (
    <div className="flex w-full justify-center space-x-8">
      {Array.from({ length: numPages }, (_, i) => {
        const path = i === 0 ? `${slug.current}` : `${slug.current}/${i + 1}`;
        return (
          <Link
            path={path}
            type={type}
            className="flex h-24 w-24 items-center justify-center rounded-full transition-colors hover:bg-primary-500 hover:text-gray-0"
            activeClassName="bg-primary-500 text-gray-0"
          >
            {i + 1}
          </Link>
        );
      })}
    </div>
  );
};
