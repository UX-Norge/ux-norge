import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, GraphqlEdges } from "@Types";
import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { PageWrapper } from "@Ui/Layout";
import { PaginationRow } from "@Components/PaginationRow";
import { ArticleGrid } from "@Components/ArticleGrid";
import { Body1, Heading1 } from "@Ui/Typography";

interface DataProps {
  allSanityArticle: GraphqlEdges;
}

const ArticleArchive: React.FC<PageProps<DataProps>> = ({
  data: { allSanityArticle },
  pageContext,
}) => {
  const articles = cleanGraphqlArray(allSanityArticle) as Article[];
  return (
    <PageWrapper>
      <main className="mx-auto max-w-page p-24">
        <Heading1 className="mt-48">Arkivet</Heading1>
        <Body1 className="mb-16">
          En samling av alle publiserte artikler på uxnorge.no. <br />
          God leting!
        </Body1>
        <ArticleGrid articles={articles} />
        <PaginationRow
          type="page"
          numPages={pageContext.numPages}
          slug={{ _type: "slug", current: "arkiv" }}
        />
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query ArticleArchiveQuery($limit: Int, $skip: Int) {
    allSanityArticle(
      sort: { publishedAt: DESC }
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

export default ArticleArchive;
