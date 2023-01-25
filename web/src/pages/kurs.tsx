import { PageHeader, PagePageHeader } from "@Components/PageHeader";
import { Seo } from "@Components/Seo";
import { AdThumbnail } from "@Features/ad/components/AdThumbnail";
import { FilterRow } from "@Features/ad/components/FilterRow";
import { ALL_STRING, useJobPageAds } from "@Features/ad/lib/useAds";
import { CourseEmptyState } from "@Features/course/CourseEmptyState";
import { CoursePageHeader } from "@Features/course/CoursePageHeader";
import { CourseThumbnail } from "@Features/course/CourseThumbnail";
import { VectorIllustrations } from "@Images/VectorIllustrations";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, Course, GraphqlEdges, PageType } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { BlockContent } from "@Ui/Typography";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityCourse: GraphqlEdges;
  sanityPage: PageType;
}

export const coursePage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => {
  let courses = cleanGraphqlArray(data.allSanityCourse) as Course[];
  const { title, text, emptyState } = data.sanityPage;

  courses = courses.filter((course) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today <= new Date(course.date);
  });

  return (
    <PageWrapper>
      <Seo title={title} location={location} />
      <PageHeader
        title={title}
        h1Class="text-primary-600"
        description={text}
        doors={<VectorIllustrations.coursePageDoors />}
        cta={data.sanityPage.cta}
      />
      <section className="mx-auto grid max-w-page gap-24 px-24 py-80 md:grid-cols-2">
        {courses.length === 0 && <BlockContent blocks={emptyState} />}
        {courses.map((course) => (
          <CourseThumbnail course={course} />
        ))}
      </section>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    sanityPage(_id: { eq: "coursePage" }) {
      ...Page
    }
    allSanityCourse(sort: { fields: date, order: DESC }) {
      edges {
        node {
          ...CourseThumbnail
        }
      }
    }
  }
`;

export default coursePage;
