import { Seo } from "@Components/Seo";
import { CourseInfo } from "@Features/course/CourseInfo";
import { DocumentHeader } from "@Features/document/DocumentHeader";
import { Course, Document } from "@Types";
import { Button } from "@Ui/Button";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent, Body1, Body2, Heading2, Heading4 } from "@Ui/Typography";
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
      <div className="pt-58 mx-auto flex max-w-prose flex-col gap-24 p-24 pb-24">
        <Heading2>{sanityCourse.title}</Heading2>
        <Body1>{sanityCourse.description}</Body1>
        <div>
          <Heading4>Nøkkelinformasjon</Heading4>
          <CourseInfo course={sanityCourse} />
        </div>
        {sanityCourse.signUpLink && (
          <div>
            <Button href={sanityCourse.signUpLink}>Påmeldingsskjema</Button>
          </div>
        )}
        <div className="prose">
          <BlockContent blocks={sanityCourse.body} />
        </div>
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
      signUpLink
      ...CourseThumbnail
    }
  }
`;

export default coursePage;
