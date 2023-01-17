import { Course } from "@Types";
import { Body1 } from "@Ui/Typography";
import * as React from "react";

export const CourseInfo: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="flex flex-col gap-8 p-8">
      {course.date && <Body1>{`📆 Dato: ${course.date}`}</Body1>}
      {course.startTime && (
        <Body1>{`🕐 Time: ${course.startTime}${
          course.endTime && ` - ${course.endTime}`
        }`}</Body1>
      )}
      {course.location && <Body1>{`📍 Sted: ${course.location}`}</Body1>}
      {course.price && <Body1>{`💰 Pris: ${course.price}`}</Body1>}
      {course.courseHolder && (
        <Body1>{`👨‍🏫 Kursholder: ${course.courseHolder.name}`}</Body1>
      )}
    </div>
  );
};
