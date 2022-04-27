import { graphql } from "gatsby";

export const query = graphql`
  fragment ArticleImage on SanityArticleImage {
    image {
      ...ImageWithPreview
    }
    alt
    caption
  }
`;
