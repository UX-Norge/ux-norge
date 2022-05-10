import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { Link } from "@Components/Link";
import { PaginationRow } from "@Components/PaginationRow";
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

const CategoryPage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
  pageContext: { currentPage, numPages },
}) => {
  const articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  const { name, slug } = data.sanityCategory;

  return (
    <PageWrapper>
      <Seo title={name} location={location} />
      {name} {currentPage}
      <div className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {articles.map((article) => (
          <ArticleThumbnail article={article} type="list" />
        ))}
      </div>
      <PaginationRow numPages={numPages} type="category" slug={slug} />
    </PageWrapper>
  );
};

export const query = graphql`
  query CategoryQuery($categorySlug: String, $limit: Int, $skip: Int) {
    sanityCategory(slug: { current: { eq: $categorySlug } }) {
      name
      slug {
        current
      }
    }
    allSanityArticle(
      filter: { category: { slug: { current: { eq: $categorySlug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...ArticleThumbnail
        }
      }
    }
  }
`;

export default CategoryPage;
