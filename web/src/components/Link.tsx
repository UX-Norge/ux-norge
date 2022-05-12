import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { ReactNode } from "react";

export type RouteTypes =
  | "article"
  | "author"
  | "ad"
  | "category"
  | "page"
  | "home";

export const getRoute = (type: RouteTypes, path: string): string => {
  return (
    {
      home: "/",
      article: `/${path}/`,
      page: `/${path}/`,
      author: `/forfatter/${path}/`,
      ad: `/stillignsannonse/${path}/`,
      category: `/kategori/${path}/`,
    }[type] ?? path
  );
};

export const Link: React.FC<{
  type: RouteTypes;
  path: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
  ariaLabel?: string;
}> = ({
  type,
  path,
  children,
  className,
  activeClassName,
  partiallyActive,
  ariaLabel,
}) => {
  if (path.includes("/") && !["author", "category"].includes(type))
    console.error(path, "Path must not contain '/'");

  return (
    <GatsbyLink
      tabIndex={0}
      to={getRoute(type, path)}
      className={className}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      title={ariaLabel}
    >
      {children}
    </GatsbyLink>
  );
};
