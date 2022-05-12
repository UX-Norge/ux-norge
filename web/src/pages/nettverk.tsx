import { Seo } from "@Components/Seo";
import { Document } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent, Heading1 } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  sanityDoc: Document;
}

export const NetworkPage: React.FC<PageProps<DataProps>> = ({
  data: {
    sanityDoc: { title, body },
  },
  location,
}) => {
  return (
    <PageWrapper className="">
      <Seo title="Nettverk" location={location} />
      <main className="mx-auto max-w-page-sm">
        <Heading1>{title}</Heading1>
        <div className="prose">
          <BlockContent blocks={body} />
        </div>
      </main>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    sanityDoc(slug: { current: { eq: "nettverk" } }) {
      title
      body: _rawBody
    }
  }
`;

export default NetworkPage;
