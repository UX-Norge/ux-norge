import { graphql } from "gatsby";
import * as React from "react";
import { CoverPage } from "@Features/coverPage";
import { ErrorPage } from "@Ui/ErrorPage/ErrorPage";
import { GraphqlEdges, Article } from "@Types";
import { cleanGraphqlArray } from "../lib/helperts";

interface IProps {
  data: { allSanityArticle: GraphqlEdges };
}

const IndexPage: React.FC<IProps> = ({ data }) => {
  let articles = cleanGraphqlArray(data.allSanityArticle?.edges) as Article[];

  articles = articles.filter(
    (article) => article.title && article.description && article.slug.current
  );

  if (!articles) {
    return (
      <ErrorPage
        title="Aiaiai!"
        message="Her har noe gått galt med hentingen av data til forsiden 😱"
        type={500}
      />
    );
  }

  return <CoverPage articles={articles} />;
};

export const query = graphql`
  query CoverPageQuery {
    allSanityArticle {
      edges {
        node {
          title
          mainImage {
            ...ArticleImage
          }
          description
          slug {
            current
          }
        }
      }
    }
  }
`;

export default IndexPage;
