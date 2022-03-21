import { graphql, Link } from "gatsby";
import * as React from "react";
import Layout from "../components/Layout";
import { Article } from "../types/sanity-types";

interface IProps {
  data: { allSanityArticle: { edges: { node: Article }[] } };
}

const IndexPage: React.FC<IProps> = ({ data: { allSanityArticle } }) => {
  return (
    <Layout>
      <ul>
        {allSanityArticle.edges.map(({ node: { title, slug } }) => {
          if (!slug?.current) return null;
          return (
            <li>
              <Link to={slug.current}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query allArticles {
    allSanityArticle {
      edges {
        node {
          title
          slug {
            current
          }
        }
      }
    }
  }
`;

export default IndexPage;
