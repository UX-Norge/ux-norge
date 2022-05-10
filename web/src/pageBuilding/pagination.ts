import { getRoute, RouteTypes } from "../components/Link";
import { SanitySlug } from "@Types";

export const createPaginatedPages = (
  type: string,
  options: {
    routeType: RouteTypes;
    slug: SanitySlug;
    postsPerPage: number;
    postsCount: number;
    component: string;
    createPage: (type: string, options: any) => void;
    customContext?: object;
  }
) => {
  const {
    routeType,
    slug,
    postsPerPage,
    postsCount,
    component,
    createPage,
    customContext,
  } = options;
  const numPages = Math.ceil(postsCount / postsPerPage);

  Array.from({ length: numPages }, (_, index) => {
    const path = index === 0 ? slug.current : `${slug.current}/${index + 1}`;
    createPage(type, {
      path: `${getRoute(routeType, path)}`,
      component,
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
        defer: index > 1,
        ...customContext,
      },
    });
  });
};
