import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { ReactNode } from "react";
import { RouteTypes } from "@Types";
import { getRoute } from "../lib/getRoute";

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
  if (
    path?.includes("/") &&
    !["author", "category", "external", "page", "course"].includes(type)
  ) {
    console.error(path, "Path must not contain '/'");
  }

  return type === "external" ? (
    <a href={path} target="_blank" className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ) : (
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
