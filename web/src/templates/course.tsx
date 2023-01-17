import { Seo } from "@Components/Seo";
import { CourseInfo } from "@Features/course/courseInfo";
import { DocumentHeader } from "@Features/document/DocumentHeader";
import { Course, Document } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  sanityCourse: Course;
}

const coursePage: React.FC<PageProps<DataProps>> = ({
  data: { sanityCourse },
  location,
}) => {
  return (
    <PageWrapper>
      <Seo
        title={sanityCourse.title}
        description={sanityCourse.description}
        location={location}
      />
      <DocumentHeader
        title={sanityCourse.title}
        description={sanityCourse.description}
      />
      <div className="mx-auto max-w-prose py-64">
        <CourseInfo course={sanityCourse} />
      </div>
      <div className="prose mx-auto max-w-prose pb-24">
        <BlockContent blocks={sanityCourse.body} />
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query CourseQuery($slugSlug: String) {
    sanityCourse(slug: { current: { eq: $slugSlug } }) {
      title
      description
      body: _rawBody
      ...CourseThumbnail
    }
  }
`;

export default coursePage;
