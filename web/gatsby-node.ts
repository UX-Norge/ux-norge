import { GatsbyNode } from "gatsby";
import path from "path";
import { Ad, Article } from "./src/types/sanity-generated-types";
import { getAds } from "./src/features/ad/lib/getAds";

type SanityData = {
  allSanityArticle: { edges: { node: Article }[] };
  allSanityAd: { edges: { node: Ad }[] };
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
            slug {
              current
            }
          }
        }
      }
      allSanityAd {
        edges {
          node {
            _id
            title
            startDate
            link
            location
            fulltime
            advertiser {
              name
              isPartner
            }
            packageType {
              onCoverPage
              onArticles
              onAdsPage
              duration
            }
          }
        }
      }
    }
  `);
  console.log(result);

  const data: {
    articles: { node: Article }[];
    ads: { node: Ad }[];
  } = {
    articles: result.data?.allSanityArticle.edges || [],
    ads: result.data?.allSanityAd.edges || [],
  };

  const templates = {
    article: path.resolve(`src/templates/article.tsx`),
  };

  const allAds = getAds(data.ads);
  console.log(allAds);

  printDivider();

  data.articles
    .filter(({ node }) => node.slug?.current)
    .forEach(({ node }) => {
      createPage("Article", {
        path: node.slug.current,
        component: templates.article,
        context: {
          slug: node.slug.current,
          articleListAds: allAds.articleListAds,
        },
      });
    });

  console.log(`Created ${pageCount} pages `);
  printDivider();
};
