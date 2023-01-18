import { Course } from "@Types";
import { Body1 } from "@Ui/Typography";
import * as React from "react";

export const CourseInfo: React.FC<{ course: Course }> = ({
  course: { date, startTime, endTime, location, price, courseHolder },
}) => {
  date = date && new Date(date);
  return (
    <div className="flex flex-col gap-8 p-8">
      {date && <Body1>{`📆 Dato: ${date}`}</Body1>}
      {startTime && (
        <Body1>{`🕐 Time: ${startTime}${endTime && ` - ${endTime}`}`}</Body1>
      )}
      {location && <Body1>{`📍 Sted: ${location}`}</Body1>}
      {price && <Body1>{`💰 Pris: ${price}`}</Body1>}
      {courseHolder && <Body1>{`👨‍🏫 Kursholder: ${courseHolder.name}`}</Body1>}
    </div>
  );
};
