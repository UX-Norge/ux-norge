import { Link } from "@Components/Link";
import { CourseInfo } from "@Features/course/CourseInfo";
import { Course } from "@Types";
import { Body1, Heading2 } from "@Ui/Typography";
import * as React from "react";

const Arrow: React.FC = () => (
  <svg
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.16667 1L15 7M15 7L9.16667 13M15 7L1 7"
      stroke="#7061EA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CourseThumbnail: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <Link
      path={course.slug.current}
      type="course"
      className="flex h-min flex-col gap-24 rounded-xs bg-primary-100 p-24 text-base text-gray-900"
    >
      
      { course.location ? "Sted: " + course.location.name: ''}
      { course.venue ? "Venue: " + course.venue: ''} 

      <Heading2>{course.title}</Heading2>
      <Body1>{course.description}</Body1>
      <CourseInfo course={course} />
      <p className="ml-auto flex items-center gap-8 text-sm text-primary-500 hover:underline">
        Les mer
        <Arrow />
      </p>
    </Link>
  );
};
