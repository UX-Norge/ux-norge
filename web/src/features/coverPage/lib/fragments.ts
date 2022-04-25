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
        image {
          ...ImageWithPreview
        }
        alt
        caption
      }
      category {
        name
      }
    }
  }
`;
