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
