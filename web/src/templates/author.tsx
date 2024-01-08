import { ArticleGrid } from "@Components/ArticleGrid";
import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { PaginationRow } from "@Components/PaginationRow";
import { Seo } from "@Components/Seo";
import { AuthorPageHeader } from "@Features/author";
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
    <PageWrapper className="bg-yellow-50">
      <Seo title={author.name} description={author.bio} location={location} />
      <div className="mx-auto max-w-page p-24">
        <AuthorPageHeader {...author} />
        <ArticleGrid articles={articles} />
        <PaginationRow
          numPages={pageContext.numPages}
          type="author"
          slug={author.slug}
        />
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query AuthorPageQuery($authorSlug: String, $limit: Int, $skip: Int) {
    sanityAuthor(slug: { current: { eq: $authorSlug } }) {
      name
      company {
        name
      }
      image {
        ...ImageWithPreview
      }
      bio: _rawBio
      email
      slug {
        current
      }
    }
    allSanityArticle(
      sort: { publishedAt: DESC }
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
