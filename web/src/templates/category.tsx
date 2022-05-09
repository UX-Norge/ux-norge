import { CoverArticleThumbnail } from "@Components/ArticleThumbnail";
import { Seo } from "@Components/Seo";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, Category, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityArticle: GraphqlEdges;
  sanityCategory: Category;
}

const CategoryPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  const { name } = data.sanityCategory;
  return (
    <PageWrapper>
      <Seo title={name} location={location} />
      {name}
      <main className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {articles.map((article) => (
          <CoverArticleThumbnail article={article} type="list" />
        ))}
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query CategoryQuery($articleSlugs: [String], $categorySlug: String) {
    allSanityArticle(filter: { slug: { current: { in: $articleSlugs } } }) {
      edges {
        node {
          ...ArticleThumbnail
        }
      }
    }
    sanityCategory(slug: { current: { eq: $categorySlug } }) {
      name
    }
  }
`;

export default CategoryPage;
