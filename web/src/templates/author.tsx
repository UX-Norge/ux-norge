import { CoverArticleThumbnail } from "@Features/coverPage/components/CoverArticleThumbnail";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Article, Author, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { graphql } from "gatsby";
import * as React from "react";

interface IProps {
  data: { allSanityArticle: GraphqlEdges; sanityAuthor: Author };
}

const AuthorPage: React.FC<IProps> = ({ data }) => {
  const articles = cleanGraphqlArray(data.allSanityArticle) as Article[];
  const author = data.sanityAuthor;

  return (
    <PageWrapper>
      <header>{author.name}</header>
      <main className="mx-auto grid max-w-page grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
        {articles.map((article) => (
          <CoverArticleThumbnail article={article} type="small" />
        ))}
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query AuthorPageQuery($authorSlug: String, $articleSlugs: [String]) {
    sanityAuthor(slug: { current: { eq: $authorSlug } }) {
      name
    }
    allSanityArticle(filter: { slug: { current: { in: $articleSlugs } } }) {
      edges {
        node {
          ...ArticleThumbnail
        }
      }
    }
  }
`;

export default AuthorPage;
