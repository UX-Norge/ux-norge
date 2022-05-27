import { GraphqlEdges } from "@Types";

export const cleanGraphqlArray = (result: GraphqlEdges | undefined): any[] => {
  if (!result?.edges) return [];
  return result?.edges.map(({ node }) => node);
};

export const shuffle = (array: any[]): any[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const classNames = (
  ...classes: (string | object | null | undefined)[]
): string => {
  const className: string[] = [];
  classes.forEach((item) => {
    if (!item) return;
    if (typeof item === "string") {
      className.push(item);
    } else if (typeof item === "object") {
      Object.keys(item).forEach((key) => {
        if (item[key as keyof typeof item]) className.push(key);
      });
    }
  });
  return className.join(" ");
};

// Print date as 21. februar 2022
export const printDate = (date: string): string => {
  return new Date(date).toLocaleDateString("nb-NO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Calculate days from now
export const daysLeft = (deadline: string): number => {
  const now = new Date();
  const then = new Date(deadline);
  const diff = then.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 3600 * 24));
};

export const flatten = (arr: any[]): any[] =>
  arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export const removeDuplicates = (
  arr: any[],
  sortByOccurences: boolean
): any[] => {
  if (sortByOccurences) {
    arr = arr.sort((a, b) => {
      return (
        arr.filter((item) => item === b).length -
        arr.filter((item) => item === a).length
      );
    });
  }
  return [...new Set(arr)];
};

export const slugify = (value: string): string => {
  return value
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};
