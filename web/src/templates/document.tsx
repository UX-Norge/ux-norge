import { Seo } from "@Components/Seo";
import { DocumentHeader } from "@Features/document/DocumentHeader";
import { Document } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  sanityDoc: Document;
}

const DocumentPage: React.FC<PageProps<DataProps>> = ({
  data: {
    sanityDoc: { title, description, cta, body },
  },
  pageContext: { pageIndex },
  location,
}) => {
  return (
    <PageWrapper>
      <Seo title={title} description={description} location={location} />
      <DocumentHeader
        title={title}
        description={description}
        pageIndex={pageIndex}
        cta={cta}
      />
      <div className="prose mx-auto max-w-prose p-24">
        <BlockContent blocks={body} />
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query DocumentQuery($documentSlug: String) {
    sanityDoc(slug: { current: { eq: $documentSlug } }) {
      title
      description
      body: _rawBody
      cta {
        text
        url
      }
    }
  }
`;

export default DocumentPage;
