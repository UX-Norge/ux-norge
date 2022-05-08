import { GatsbyNode } from "gatsby";
import path from "path";
import { Ad, Article, Author, Category, GraphqlEdges } from "@Types";
import { getActiveAdIds } from "./src/features/ad/lib/getAds";
import { cleanGraphqlArray } from "./src/lib/helpers";
import { getRoute } from "./src/components/Link";

type SanityData = {
  allSanityArticle: GraphqlEdges;
  allSanityAd: GraphqlEdges;
  allSanityAuthor: GraphqlEdges;
  allSanityCategory: GraphqlEdges;
};

const printDivider = () => console.log("\n------------\n");

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  let pageCount = 0;

  const createPage = (type: string, options: any) => {
    console.log(`${type}: ${options.path}`);
    pageCount++;
    actions.createPage(options);
  };

  const result = await graphql<SanityData>(`
    query {
      allSanityArticle {
        edges {
          node {
            authors {
              _id
            }
            slug {
              current
            }
            category {
              _id
            }
          }
        }
      }
      allSanityAd {
        edges {
          node {
            _id
            startDate
            packageType {
              onCoverPage
              onArticles
              onAdsPage
              duration
            }
          }
        }
      }
      allSanityAuthor {
        edges {
          node {
            _id
            slug {
              current
            }
          }
        }
      }
      allSanityCategory {
        edges {
          node {
            _id
            name
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const data: {
    articles: Article[];
    ads: Ad[];
    authors: Author[];
    categories: Category[];
  } = {
    articles: cleanGraphqlArray(result.data?.allSanityArticle) as Article[],
    ads: cleanGraphqlArray(result.data?.allSanityAd) as Ad[],
    authors: cleanGraphqlArray(result.data?.allSanityAuthor) as Author[],
    categories: cleanGraphqlArray(result.data?.allSanityCategory) as Category[],
  };

  const templates = {
    article: path.resolve(`src/templates/article.tsx`),
    author: path.resolve(`src/templates/author.tsx`),
    category: path.resolve(`src/templates/category.tsx`),
  };

  const allAds = getActiveAdIds(data.ads);

  printDivider();

  data.articles
    .filter((article) => article.slug?.current)
    .forEach((article, index) => {
      createPage("Article", {
        path: getRoute("article", article.slug.current),
        component: templates.article,
        context: {
          slug: article.slug.current,
          articleListAds: allAds?.articleListAds,
          categoryId: article.category?._id,
        },
        defer: index > 20,
      });
    });

  data.authors
    .filter((author) => author.slug?.current)
    .forEach((author) => {
      createPage("Author", {
        path: getRoute("author", author.slug.current),
        component: templates.author,
        context: {
          authorSlug: author.slug.current,
          // Filter all the articles that have this author as an author
          articleSlugs: data.articles
            .filter((article) =>
              article.authors.some(
                ({ _id: authorId }) => authorId === author._id
              )
            )
            .map((article) => article.slug.current),
        },
      });
    });

  data.categories
    .filter((category) => category.slug?.current)
    .forEach((category) => {
      createPage("Category", {
        path: getRoute("category", category.slug.current),
        component: templates.category,
        context: {
          categorySlug: category.slug.current,
          // Filter all the articles that have this category as a category
          articleSlugs: data.articles
            .filter((article) => article.category?._id === category._id)
            .map((article) => article.slug.current),
        },
      });
    });
  console.log(`\nCreated ${pageCount} pages `);
  printDivider();
};
