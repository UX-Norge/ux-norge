import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { PaginationRow } from "@Components/PaginationRow";
import { Seo } from "@Components/Seo";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, Author, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { graphql, Page, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityArticle: GraphqlEdges;
  sanityAuthor: Author;
}

const AuthorPage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
  pageContext,
}) => {
  const articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  const author = data.sanityAuthor;

  return (
    <PageWrapper>
      <Seo title={author.name} description={author.bio} location={location} />
      <header>{author.name}</header>
      <main className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {articles.map((article) => (
          <ArticleThumbnail article={article} type="small" />
        ))}
      </main>
      <PaginationRow
        numPages={pageContext.numPages}
        type="author"
        slug={author.slug}
      />
    </PageWrapper>
  );
};

export const query = graphql`
  query AuthorPageQuery($authorSlug: String, $limit: Int, $skip: Int) {
    sanityAuthor(slug: { current: { eq: $authorSlug } }) {
      name
      slug {
        current
      }
    }
    allSanityArticle(
      filter: {
        authors: { elemMatch: { slug: { current: { eq: $authorSlug } } } }
      }
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

export default AuthorPage;
