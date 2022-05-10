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
    category {
      name
    }
    slug {
      current
    }
  }

  fragment AdThumbnail on SanityAd {
    title
    slug {
      current
    }
    description
    location {
      name
    }
    link
    jobType
    startDate
    deadline
    packageType {
      duration
    }
    advertiser {
      name
      logo {
        ...Image
      }
    }
  }
`;
