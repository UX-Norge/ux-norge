import { ArticleGrid } from "@Components/ArticleGrid";
import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { Link } from "@Components/Link";
import { PaginationRow } from "@Components/PaginationRow";
import { Seo } from "@Components/Seo";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, Category, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { Heading1, Overline } from "@Ui/Typography";
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
      <div className="mx-auto max-w-page p-24">
        <Overline>Kategori</Overline>
        <Heading1 className="mb-48">{name}</Heading1>
        <ArticleGrid articles={articles} />
        <PaginationRow numPages={numPages} type="category" slug={slug} />
      </div>
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
