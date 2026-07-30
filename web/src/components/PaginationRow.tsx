import { SanitySlug } from "@Types";
import * as React from "react";
import { navigate } from "gatsby";
import { Link, RouteTypes } from "@Components/Link";
import { getRoute } from "@Lib/getRoute";

interface IProps {
  numPages: number;
  currentPage: number;
  slug: SanitySlug;
  type: RouteTypes;
}

const pagePath = (slug: string, page: number) =>
  page <= 1 ? slug : `${slug}/${page}`;

export const PaginationRow: React.FC<IProps> = ({
  numPages,
  currentPage,
  slug,
  type,
}) => {
  if (numPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < numPages;
  const linkClassName =
    "rounded-full px-16 py-8 transition-colors hover:bg-primary-500 hover:text-white";
  const disabledClassName = "rounded-full px-16 py-8 text-gray-400";

  const goToPage = (page: number) => {
    navigate(getRoute(type, pagePath(slug.current, page)));
  };

  return (
    <nav
      className="mt-48 flex w-full flex-wrap items-center justify-center gap-16"
      aria-label="Paginering"
    >
      {hasPrevious ? (
        <Link
          path={pagePath(slug.current, currentPage - 1)}
          type={type}
          className={linkClassName}
          ariaLabel="Forrige side"
        >
          Forrige
        </Link>
      ) : (
        <span className={disabledClassName} aria-disabled="true">
          Forrige
        </span>
      )}

      <label className="flex items-center gap-8 text-sm tabular-nums">
        <span>Side</span>
        <select
          className="rounded border border-gray-900 bg-white px-8 py-4"
          value={currentPage}
          aria-label="Velg side"
          onChange={(event) => goToPage(Number(event.target.value))}
        >
          {Array.from({ length: numPages }, (_, index) => {
            const page = index + 1;
            return (
              <option key={page} value={page}>
                {page}
              </option>
            );
          })}
        </select>
        <span>av {numPages}</span>
      </label>

      {hasNext ? (
        <Link
          path={pagePath(slug.current, currentPage + 1)}
          type={type}
          className={linkClassName}
          ariaLabel="Neste side"
        >
          Neste
        </Link>
      ) : (
        <span className={disabledClassName} aria-disabled="true">
          Neste
        </span>
      )}
    </nav>
  );
};
