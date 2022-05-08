import { CoverArticleThumbnail } from "@Components/ArticleThumbnail";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, Category, GraphqlEdges } from "@Types";
import { graphql } from "gatsby";
import * as React from "react";

interface IProps {
  data: {
    allSanityArticle: GraphqlEdges;
    sanityCategory: Category;
  };
}

const CategoryPage: React.FC<IProps> = ({ data }) => {
  const articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  const { name } = data.sanityCategory;
  return (
    <div>
      {name}
      <main className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {articles.map((article) => (
          <CoverArticleThumbnail article={article} type="list" />
        ))}
      </main>
    </div>
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
