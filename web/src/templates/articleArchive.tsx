import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, GraphqlEdges } from "@Types";
import { graphql, PageProps } from "gatsby";
import * as React from "react";
import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { PageWrapper } from "@Ui/Layout";
import { PaginationRow } from "@Components/PaginationRow";

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
      <main className="mx-auto max-w-page">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-24">
          {articles.map((article) => (
            <ArticleThumbnail article={article} type="list" />
          ))}
        </div>
        <PaginationRow
          type="archive"
          numPages={pageContext.numPages}
          slug={{ _type: "slug", current: "/arkiv" }}
        />
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query ArticleArchiveQuery($limit: Int, $skip: Int) {
    allSanityArticle(limit: $limit, skip: $skip) {
      edges {
        node {
          ...ArticleThumbnail
        }
      }
    }
  }
`;

export default ArticleArchive;
