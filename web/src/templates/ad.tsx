import { Seo } from "@Components/Seo";
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
  data: {
    sanityAd: {
      title,
      description,
      body,
      image,
      location: adLocation,
      advertiser,
      deadline,
      contactName,
      contactPhone,
      contactEmail,
      link,
      slug,
      startDate,
      packageType,
    },
  },
  location,
}) => {
  return (
    <PageWrapper>
      <Seo title={title} description={description} location={location} />
      <main className="mx-auto max-w-page-sm">
        <div className="max-w-prose">
          <div className="p-24">
            <Overline className="text-blue-500">
              {advertiser.name} •{" "}
              {adLocation.map(({ name }) => name).join(", ")}
            </Overline>
            <Heading1 className="wrap hyphen break-words">{title}</Heading1>
            <Body1 className="font-bold">{description}</Body1>
            <Overline className="mt-24 text-blue-500">
              {getDaysToDeadline(deadline)}
            </Overline>
          </div>
          {image && (
            <div className="aspect-w-1 aspect-h-1 mr-24">
              <Image
                className="mb-24 rounded-tr-xl rounded-br-xs object-cover"
                image={image}
                alt={title}
                width={1000}
              />
            </div>
          )}
          <div className="prose p-24">
            <BlockContent blocks={body} />
          </div>
          <div className="p-24">
            {contactName && (
              <>
                <Heading4>Kontaktperson:</Heading4>
                <Body1>{contactName}</Body1>
                {contactPhone && <Body1>{contactPhone}</Body1>}
                {contactEmail && <Body1>{contactEmail}</Body1>}
              </>
            )}
            <br />
            <Button href={link}>Søk her</Button>
          </div>
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
