import { Link } from "@Components/Link";
import { Course } from "@Types";
import { Body1, Heading4 } from "@Ui/Typography";
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
  const formattedDate =
    course.startDate && new Date(course.startDate).toLocaleDateString("no-nb", { dateStyle: "long" });
  return (
    <Link
      path={course.slug.current}
      type="course"
      className="flex flex-col gap-16 rounded-t bg-primary-100 p-24 pb-40 text-base text-gray-900"
    >
      <Heading4 className="text-primary-800">{course.title}</Heading4>
      <div>
        {course.location && <Body1>{`📍 Sted: ${course.location.name}`}</Body1>}
        {course.startDate && <Body1>{`📆 Dato: ${formattedDate}`}</Body1>}
      </div>
      <Body1>{course.description}</Body1>
    </Link>
  );
};
