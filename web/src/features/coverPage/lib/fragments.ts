import { graphql } from "gatsby";

export const query = graphql`
  fragment ArticleFragmentThumbnail on SanityArticleThumbnail {
    article {
      title
      description
      slug {
        current
      }
      mainImage {
        ...ImageWithPreview
      }
      category {
        name
      }
    }
  }
`;
