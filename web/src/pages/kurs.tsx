import { PageHeader } from "@Components/PageHeader";
import { Seo } from "@Components/Seo";
import { CourseThumbnail } from "@Features/course/CourseThumbnail";
import { VectorIllustrations } from "@Images/VectorIllustrations";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Course, GraphqlEdges, PageType } from "@Types";
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

    return today <= new Date(course.startDate);
  });

  /* lag en datastruktur med kurs etter hvilken måned startDate er i */
  const coursesByMonth = courses.reduce((acc: any, course: Course) => {
    const month: number = new Date(course.startDate).getMonth();
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(course);
    return acc;
  }, {});

  console.log(coursesByMonth)
  /* array med måneder på norsk */
  const months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];


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
      {Object.keys(coursesByMonth)
       .sort((a, b) => parseInt(a) - parseInt(b))
       .map((month) => (
        <div key={month}>
          <section  className="mx-auto grid max-w-page gap-24 px-24 py-80 md:grid-cols-2">
            {courses.length === 0 && <BlockContent blocks={emptyState} />}
            {months[parseInt(month)]}
            {coursesByMonth[month].map((course: Course) => (
              <CourseThumbnail key={course._id} course={course} />
          ))}
          </section>
        </div>
      ))}
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    sanityPage(_id: { eq: "coursePage" }) {
      ...Page
    }
    allSanityCourse(sort: { startDate : DESC }) {
      edges {
        node {
          ...CourseThumbnail
        }
      }
    }
  }
`;

export default coursePage;
