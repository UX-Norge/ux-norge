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
    _id
    title
    mainImage {
      ...ArticleImage
    }
    description
    category {
      name
    }
    slug {
      current
    }
  }

  fragment AdThumbnail on SanityAd {
    _id
    _createdAt
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
    deadline
    packageType {
      duration
    }
    isRemote
    advertiser {
      name
      logo {
        ...Image
      }
    }
  }
`;
