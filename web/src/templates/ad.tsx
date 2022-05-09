import { Seo } from "@Components/Seo";
import { Ad } from "@Types";
import { Image } from "@Ui/Image";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent, Body1, Heading1, Overline } from "@Ui/Typography";
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
          {image && (
            <Image className="mb-24" image={image} alt={title} width={1000} />
          )}
          <Overline>
            {advertiser.name} • {adLocation.map(({ name }) => name).join(", ")}
          </Overline>
          <Heading1>{title}</Heading1>
          <Body1 className="mb-48 font-bold">{description}</Body1>
          <div className="prose">
            <BlockContent blocks={body} />
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
