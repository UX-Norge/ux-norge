import { GatsbyNode } from "gatsby";
import path from "path";
import { Article, Author } from "./src/types/sanity-types";

type SanityData = {
  allSanityArticle: { edges: { node: Article }[] };
};

let pageCount = 0;
const printDivider = () => console.log("\n------------\n");

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage: gatsbyCreatePage } = actions;
  const createPage = (type, options) => {
    console.log(`${type}: ${options.path}`);
    pageCount++;
    gatsbyCreatePage(options);
  };

  const result = await graphql<SanityData>(`
    query {
      allSanityArticle {
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
  const data = {
    articles: result.data.allSanityArticle.edges || [],
  };
  const templates = {
    article: path.resolve(`src/templates/article.tsx`),
  };

  printDivider();

  data.articles.forEach(({ node }) => {
    createPage("Article", {
      path: node.slug.current,
      component: templates.article,
      context: {
        slug: node.slug.current,
      },
    });
  });

  console.log(`Created ${pageCount} pages `);
  printDivider();
};
