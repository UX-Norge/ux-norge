import { Article, Author, GraphqlEdges } from "@Types";

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

// Algorithm to push newly published artices down to third place on cover page
export const pushSponsoredContentDownOnFrontPage = (articles: Article[]): Article[]  => {
  let indexOfFirstSponsored = articles.slice(0,2).findIndex(a => a.isSponsoredContent);
  
  if (indexOfFirstSponsored !== -1) {

    // Ta ut sponsored content av articles
    const sponsoredContent = articles.splice(indexOfFirstSponsored,1);
    
    // finn neste tilfelle av vanlig artikkel i array
    const firstUnsponsoredAfterSponsoredContent = articles.slice(indexOfFirstSponsored).findIndex(article => !article.isSponsoredContent) + indexOfFirstSponsored;
    const after = articles.splice(firstUnsponsoredAfterSponsoredContent + 1);
    
    articles = articles.concat(sponsoredContent, after);
    return pushSponsoredContentDownOnFrontPage(articles);
  } else {
    return articles;
  }
}

const splitArray = (array: [], index: number) => {
  const beforeArray = array.slice(index, 1);
  const afterArray = array.slice(index);
  return { beforeArray, afterArray };
}

// export const formatArticleAuthors = (authors: Author[]) => {
//   const everyAuthorIsFromSameCompany =
//     authors.every(
//       (author) => author.company?.name === authors[0].company?.name
//     ) && authors.length > 1;
//   const everyAuthorIsFromUxNorge = authors.every(
//     (author) => author.company?.name === "UX Norge"
//   );

//   if (everyAuthorIsFromSameCompany && !everyAuthorIsFromUxNorge) {
//     const authorNames = authors.map((author) => author.name).join(", ");
//     return `${authorNames} • ${authors[0].company?.name}`;
//   }

//   if (everyAuthorIsFromUxNorge) {
//     return authors.map((author) => author.name).join(", ");
//   }

//   const articleAuthors = authors
//     .map((author) =>
//       !!author.company ? `${author.name} • ${author.company.name}` : author.name
//     )
//     .join(", ");

//   return articleAuthors;
// };
