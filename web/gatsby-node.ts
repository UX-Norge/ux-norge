import { GatsbyNode } from "gatsby";
import path from "path";
import { Ad, Article, Author, Category, Document, GraphqlEdges } from "@Types";
import {
  getActiveAdIds,
  getArticlePageAds,
  hasExpired,
} from "./src/features/ad/lib/getAds";
import { cleanGraphqlArray } from "./src/lib/helpers";
import { getRoute } from "./src/components/Link";
import { createPaginatedPages } from "./src/pageBuilding/pagination";

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
            slug {
              current
            }
            startDate
            packageType {
              onCoverPage
              onArticles
              onAdsPage
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
    documents: Document[];
  } = {
    articles: cleanGraphqlArray(result.data?.allSanityArticle) as Article[],
    ads: cleanGraphqlArray(result.data?.allSanityAd) as Ad[],
    authors: cleanGraphqlArray(result.data?.allSanityAuthor) as Author[],
    categories: cleanGraphqlArray(result.data?.allSanityCategory) as Category[],
    documents: cleanGraphqlArray(result.data?.allSanityDoc) as Document[],
  };

  const templates = {
    article: path.resolve(`src/templates/article.tsx`),
    author: path.resolve(`src/templates/author.tsx`),
    category: path.resolve(`src/templates/category.tsx`),
    ad: path.resolve(`src/templates/ad.tsx`),
    articleArchive: path.resolve(`src/templates/articleArchive.tsx`),
    document: path.resolve(`src/templates/document.tsx`),
  };

  printDivider();

  const { listAds: articleListAds, bannerAds: articleBannerAds } =
    getArticlePageAds(data.ads);

  data.articles
    .filter((article) => article.slug?.current)
    .forEach((article, index) => {
      createPage("Article", {
        path: getRoute("article", article.slug.current),
        component: templates.article,
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
    component: templates.articleArchive,
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
        component: templates.author,
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
        component: templates.category,
        customContext: {
          categorySlug: category.slug.current,
        },
        createPage,
      });
    });

  data.ads
    .filter(
      (ad) =>
        ad.slug?.current && !hasExpired(ad.startDate, ad.packageType?.duration)
    )
    .forEach((ad) => {
      createPage("Ad", {
        path: getRoute("ad", ad.slug.current),
        component: templates.ad,
        context: {
          adSlug: ad.slug.current,
        },
      });
    });

  data.documents
    .filter((doc) => doc.slug?.current)
    .forEach((doc, index) => {
      createPage("Document", {
        path: getRoute("page", doc.slug.current),
        component: templates.document,
        context: {
          documentSlug: doc.slug.current,
          pageIndex: index,
        },
      });
    });

  console.log(`\nCreated ${pageCount} pages `);
  printDivider();
};
