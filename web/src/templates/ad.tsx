import { Seo } from "@Components/Seo";
import { AdPageHeader } from "@Features/ad/components/AdPageHeader";
import { ContactPerson } from "@Features/ad/components/ContactPerson";
import { ArticleImage } from "@Features/article";
import { Ad } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import { Youtube } from "@Features/article/components/Youtube";
import * as React from "react";

interface DataProps {
  sanityAd: Ad;
}

export const getExpiryDate = (startDateString: string, duration: number): Date => {
  const endDate = new Date(startDateString);
  endDate.setDate(endDate.getDate() + duration);
  return endDate; 
}

const adSerializers = {
  types: { articleImage: ArticleImage, youtube: Youtube },
};

export const AdPage: React.FC<PageProps<DataProps>> = ({
  data: { sanityAd },
  location,
}) => {
  return (
    <PageWrapper showPartners={false} showNewsletter={false}>
      <Seo
        title={sanityAd.title}
        description={sanityAd.description}
        adLocationString={sanityAd.location.map(({ name }) => name).join(", ")}
        type="job-ad"
        company={sanityAd.advertiser}
        adExpiryDate={getExpiryDate(sanityAd.startDate, sanityAd.packageType?.duration)}
      />
      <main className="mx-auto max-w-page pb-128">
        <AdPageHeader {...sanityAd} />
        <div className="mx-auto max-w-prose p-24">
          <ContactPerson {...sanityAd} />
          <BlockContent
            blocks={sanityAd.body}
            prose
            serializers={adSerializers}
          />
        </div>
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query AdPageQuery($adSlug: String) {
    sanityAd(slug: { current: { eq: $adSlug } }) {
      title
      _createdAt
      description
      body: _rawBody
      deadline
      link
      linkText
      contactName
      contactPhone
      contactEmail
      startDate
      image {
        ...ImageWithPreview
      }
      advertiser {
        name
      }
      location {
        name
      }
      packageType {
        duration
      }
    }
  }
`;

export default AdPage;
