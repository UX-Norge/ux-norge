import { RouteTypes } from "@Types";

export const getRoute = (type: RouteTypes, path: string): string => {
  return (
    {
      home: "/",
      article: `/${path}/`,
      page: `/${path}/`,
      author: `/forfatter/${path}/`,
      ad: `/stillingsannonse/${path}/`,
      category: `/kategori/${path}/`,
      external: null,
      course: `/kurs/${path}/`,
    }[type] ?? path
  );
};
