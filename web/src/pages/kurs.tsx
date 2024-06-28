import { PageHeader } from "@Components/PageHeader";
import { Seo } from "@Components/Seo";
import { FilterRow } from "@Features/ad/components/FilterRow";
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
const ALL_STRING = "Alle";

export const coursePage: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => {
  const { title, text, emptyState } = data.sanityPage;
  let courses = cleanGraphqlArray(data.allSanityCourse) as Course[];
  const [ selectedLocations, setSelectedLocations ] = React.useState<string[]>([ALL_STRING]);
  const [filteredCoursesByMonth, setFilteredCoursesByMonth] = React.useState<{[key: string]: Course[]}>({});
  courses = courses.filter((course) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today <= new Date(course.startDate);
  });
  

  React.useEffect(() => {
    let filteredCourses;
    if (selectedLocations?.includes(ALL_STRING)) {
      filteredCourses = courses;
    } else {
      filteredCourses = courses.filter((course) => {
        
        if (selectedLocations && selectedLocations.includes(ALL_STRING)) {
          return true;
        } else {
          if (selectedLocations && selectedLocations.includes(course.location?.name)) {
            return true;
          } else {
            return false;
          }
        }
      })
    }
    /* lag en datastruktur med kurs etter hvilken måned startDate er i */
    const coursesByMonth = filteredCourses.reduce((acc: any, course: Course) => {
      const month: number = new Date(course.startDate).getMonth();
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(course);
      return acc;
    }, {});
    setFilteredCoursesByMonth(coursesByMonth);

  }, [selectedLocations]);
  

  /* trekk ut location.name fra alle kursene */
  const locations = courses.filter(course => course.location).map((course) => course.location?.name);

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

  /* select hvor alle locations er options (og unike) */
  const uniqueLocations = Array.from(new Set(locations));

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

      <FilterRow
            label="Sted:"
            allString={ALL_STRING}
            options={uniqueLocations}
            selected={selectedLocations}
            setSelected={setSelectedLocations}
          />
      {Object.keys(filteredCoursesByMonth)
       .sort((a, b) => parseInt(a) - parseInt(b))
       .map((month) => (
        <div key={month}>
          <section className="mx-auto grid max-w-page gap-24 px-24 py-80 md:grid-cols-2">
            {courses.length === 0 && <BlockContent blocks={emptyState} />}
            {months[parseInt(month)]}
            {filteredCoursesByMonth[month].map((course: Course) => (
              <CourseThumbnail key={course.slug.current} course={course} />
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
