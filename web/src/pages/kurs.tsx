import { PageHeader, PagePageHeader } from "@Components/PageHeader";
import { Seo } from "@Components/Seo";
import { AdThumbnail } from "@Features/ad/components/AdThumbnail";
import { FilterRow } from "@Features/ad/components/FilterRow";
import { ALL_STRING, useJobPageAds } from "@Features/ad/lib/useAds";
import { CoursePageHeader } from "@Features/course/CoursePageHeader";
import { CourseThumbnail } from "@Features/course/CourseThumbnail";
import { VectorIllustrations } from "@Images/VectorIllustrations";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Ad, Course, GraphqlEdges } from "@Types";
import { PageWrapper } from "@Ui/Layout";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

interface DataProps {
  allSanityCourse: GraphqlEdges;
}

export const coursePage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => {
  let courses = cleanGraphqlArray(data.allSanityCourse) as Course[];

  return (
    <PageWrapper>
      <Seo title="Kurs" location={location} />
      <PageHeader
        title="Kurs"
        h1Class="text-primary-600"
        description="Bli bedre på det du er god på eller lær ny kunnskap fra de flinke folkene i familjøet vårt. 
Her har vi samlet kursene du kan melde deg på."
        doors={<VectorIllustrations.coursePageDoors />}
      />
      <section className="mx-auto grid max-w-page gap-24 px-24 py-80 md:grid-cols-2">
        {courses.map((course) => (
          <CourseThumbnail course={course} />
        ))}
      </section>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
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
