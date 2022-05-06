import { graphql } from "gatsby";

export const query = graphql`
  fragment ArticleImage on SanityArticleImage {
    image {
      ...ImageWithPreview
    }
    alt
    caption
  }

  fragment ArticleThumbnail on SanityArticle {
    title
    mainImage {
      ...ArticleImage
    }
    description
    isFeature
    slug {
      current
    }
  }
`;
