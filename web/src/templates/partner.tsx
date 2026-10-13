import { Seo } from "@Components/Seo";
import { PartnerPageContent } from "@Features/partner";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, Article, Company, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  sanityCompany: Company;
  partnerAds: GraphqlEdges;
  partnerArticles: GraphqlEdges;
}

const PartnerPage: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const company = data.sanityCompany;
  const ads = cleanGraphqlArray(data.partnerAds) as Ad[];
  const articles = cleanGraphqlArray(data.partnerArticles) as Article[];
  const title = company.partnerTitle || company.name;

  return (
    <PageWrapper>
      <Seo
        title={title}
        description={company.partnerDescription}
        image={company.partnerMainImage?.image}
        imageAlt={company.partnerMainImage?.alt}
        location={location}
        company={company}
      />
      <PartnerPageContent company={company} ads={ads} articles={articles} />
    </PageWrapper>
  );
};

export const query = graphql`
  query PartnerPageQuery($slug: String, $companyId: String) {
    sanityCompany(slug: { current: { eq: $slug } }) {
      _id
      name
      partnerTitle
      partnerDescription
      partnerBody: _rawPartnerBody(resolveReferences: { maxDepth: 4 })
      partnerMainImage {
        alt
        image {
          ...ImageWithPreview
        }
      }
      logo {
        ...ImageWithPreview
      }
      slug {
        current
      }
    }
    partnerAds: allSanityAd(
      filter: { advertiser: { _id: { eq: $companyId } } }
      sort: { startDate: DESC }
    ) {
      edges {
        node {
          ...AdThumbnail
        }
      }
    }
    partnerArticles: allSanityArticle(
      filter: { company: { _id: { eq: $companyId } } }
      sort: { publishedAt: DESC }
    ) {
      edges {
        node {
          _id
          title
          description
          publishedAt
          hideOnPartnerPage
          slug {
            current
          }
          category {
            name
          }
          mainImage {
            ...ArticleImage
          }
        }
      }
    }
  }
`;

export default PartnerPage;
