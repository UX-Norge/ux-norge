import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { ReactNode } from "react";

type routeTypes = "article" | "author" | "ad" | "category" | "page";

export const getRoute = (type: routeTypes, path: string): string => {
  return (
    {
      article: `/${path}`,
      page: `/${path}`,
      author: `/forfatter/${path}`,
      ad: `/stillignsannonse/${path}`,
      category: `/kategori/${path}`,
    }[type] ?? path
  );
};

export const Link: React.FC<{
  type: routeTypes;
  path: string;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  partiallyActive?: boolean;
}> = ({
  type,
  path,
  children,
  className,
  activeClassName,
  partiallyActive,
}) => {
  if (path.includes("/")) console.error("Path must not contain '/'");

  return (
    <GatsbyLink
      tabIndex={0}
      to={getRoute(type, path)}
      className={className}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
    >
      {children}
    </GatsbyLink>
  );
};
