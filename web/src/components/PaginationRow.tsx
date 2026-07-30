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

const focusRingClassName =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500";

export const PaginationRow: React.FC<IProps> = ({
  numPages,
  currentPage,
  slug,
  type,
}) => {
  const selectId = React.useId();
  const totalPagesId = React.useId();

  if (numPages <= 1) return null;

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < numPages;
  const linkClassName = `rounded-full px-16 py-8 transition-colors hover:bg-primary-500 hover:text-white ${focusRingClassName}`;
  const disabledClassName = "rounded-full px-16 py-8 text-gray-700";

  const goToPage = (page: number) => {
    if (page === currentPage) return;
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
        <span className={disabledClassName}>
          Forrige
          <span className="sr-only"> (ikke tilgjengelig)</span>
        </span>
      )}

      <div className="flex items-center gap-8 text-sm tabular-nums">
        <label htmlFor={selectId}>Side</label>
        <select
          id={selectId}
          className={`rounded border border-gray-900 bg-white px-8 py-4 ${focusRingClassName}`}
          value={currentPage}
          aria-describedby={totalPagesId}
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
        <span id={totalPagesId}>av {numPages}</span>
      </div>

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
        <span className={disabledClassName}>
          Neste
          <span className="sr-only"> (ikke tilgjengelig)</span>
        </span>
      )}
    </nav>
  );
};
