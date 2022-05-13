import { Seo } from "@Components/Seo";
import { AdPageHeader } from "@Features/ad/components/AdPageHeader";
import { ContactPerson } from "@Features/ad/components/ContactPerson";
import { getDaysToDeadline } from "@Features/ad/lib/getDaysToDeadline";
import { daysLeft } from "@Lib/helpers";
import { Ad } from "@Types";
import { Button } from "@Ui/Button";
import { Image } from "@Ui/Image";
import { PageWrapper } from "@Ui/Layout";
import {
  BlockContent,
  Body1,
  Heading1,
  Heading4,
  Overline,
} from "@Ui/Typography";
import { graphql, Page, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  sanityAd: Ad;
}

export const AdPage: React.FC<PageProps<DataProps>> = ({
  data: { sanityAd },
  location,
}) => {
  return (
    <PageWrapper showPartners={false} showNewsletter={false}>
      <Seo
        title={sanityAd.title}
        description={sanityAd.description}
        location={location}
      />
      <main className="mx-auto max-w-page">
        <AdPageHeader {...sanityAd} />
        <div className="mx-auto max-w-prose p-24">
          <ContactPerson {...sanityAd} />
          <BlockContent blocks={sanityAd.body} prose />
        </div>
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query AdPageQuery($adSlug: String) {
    sanityAd(slug: { current: { eq: $adSlug } }) {
      title
      description
      body: _rawBody
      deadline
      link
      contactName
      contactPhone
      contactEmail
      image {
        ...ImageWithPreview
      }
      advertiser {
        name
      }
      location {
        name
      }
      startDate
      packageType {
        duration
      }
    }
  }
`;

export default AdPage;
