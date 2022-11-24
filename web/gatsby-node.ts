import { GatsbyNode } from "gatsby";
import path from "path";
import { Ad, Article, Author, Category, Document, GraphqlEdges } from "@Types";
import {
  activeFilter,
  divideListAndBannerAds,
  validAdFilter,
} from "./src/features/ad/lib/adHelpers";
import { cleanGraphqlArray, shuffle } from "./src/lib/helpers";
import { createPaginatedPages, validateData } from "./src/pageBuilding";
import { getRoute } from "./src/lib/getRoute";

type SanityData = {
  allSanityArticle: GraphqlEdges;
  allSanityAd: GraphqlEdges;
  allSanityAuthor: GraphqlEdges;
  allSanityCategory: GraphqlEdges;
  allSanityDoc: GraphqlEdges;
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
      allSanityArticle(sort: { fields: publishedAt, order: DESC }) {
        edges {
          node {
            _id
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
            _createdAt
            _id
            slug {
              current
            }
            title
            description
            advertiser {
              name
            }
            startDate
            packageType {
              onArticles
              type
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
      allSanityDoc {
        edges {
          node {
            _id
            slug {
              current
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    throw result.errors;
  }

  const data: {
    articles: Article[];
    ads: Ad[];
    authors: Author[];
    categories: Category[];
    documents: Document[];
  } = {
    articles: cleanGraphqlArray(result.data?.allSanityArticle) as Article[],
    ads: cleanGraphqlArray(result.data?.allSanityAd) as Ad[],
    authors: cleanGraphqlArray(result.data?.allSanityAuthor) as Author[],
    categories: cleanGraphqlArray(result.data?.allSanityCategory) as Category[],
    documents: cleanGraphqlArray(result.data?.allSanityDoc) as Document[],
  };

  validateData(data);

  printDivider();

  const { listAds: articleListAds, bannerAds: articleBannerAds } =
    divideListAndBannerAds(
      shuffle(
        data.ads
          .filter(validAdFilter)
          .filter(activeFilter)
          .filter((ad) => ad.packageType.onArticles)
      )
    );

  data.articles
    .filter((article) => article.slug?.current)
    .forEach((article, index) => {
      createPage("Article", {
        path: getRoute("article", article.slug.current),
        component: path.resolve(`src/templates/article.tsx`),
        ownerNodeId: article._id,
        context: {
          articleListAds: articleListAds.map((ad) => ad._id),
          articleBannerAds: articleBannerAds.map((ad) => ad._id),
          slug: article.slug.current,
          categoryId: article.category?._id,
        },
        defer: index > 20,
      });
    });

  createPaginatedPages("Article Archive", {
    routeType: "page",
    slug: { _type: "slug", current: "arkiv" },
    component: path.resolve(`src/templates/articleArchive.tsx`),
    postsPerPage: 12,
    postsCount: data.articles.length,
    createPage,
  });

  data.authors
    .filter((author) => author.slug?.current)
    .forEach((author) => {
      createPaginatedPages("Author", {
        routeType: "author",
        slug: author.slug,
        component: path.resolve(`src/templates/author.tsx`),
        postsPerPage: 12,
        postsCount: data.articles.filter((article) =>
          article.authors.some(({ _id: authorId }) => authorId === author._id)
        ).length,
        customContext: {
          authorSlug: author.slug.current,
          // Filter all the articles that have this author as an author
        },
        createPage,
      });
    });

  data.categories
    .filter((category) => category.slug?.current)
    .forEach((category) => {
      createPaginatedPages("Category", {
        routeType: "category",
        slug: category.slug,
        postsPerPage: 10,
        postsCount: data.articles.filter(
          (article) => article.category?._id === category._id
        ).length,
        component: path.resolve(`src/templates/category.tsx`),
        customContext: {
          categorySlug: category.slug.current,
        },
        createPage,
      });
    });

  data.ads.filter(validAdFilter).forEach((ad) => {
    createPage("Ad", {
      path: getRoute("ad", ad.slug.current),
      component: path.resolve(`src/templates/ad.tsx`),
      ownerNodeId: ad._id,
      context: {
        adSlug: ad.slug.current,
      },
      defer: !activeFilter(ad),
    });
  });

  data.documents
    .filter((doc) => doc.slug?.current)
    .forEach((doc, index) => {
      createPage("Document", {
        path: getRoute("page", doc.slug.current),
        component: path.resolve(`src/templates/document.tsx`),
        ownerNodeId: doc._id,
        context: {
          documentSlug: doc.slug.current,
        },
      });
    });

  console.log(`\nCreated ${pageCount} pages `);
  printDivider();
};
