import { Course } from "@Types";
import { Body1 } from "@Ui/Typography";
import * as React from "react";

export const CourseInfo: React.FC<{ course: Course }> = ({
  course: { startDate, endDate, startTime, endTime, venue, price, courseHolders },
}) => {
  const formattedDate =
    startDate && new Date(startDate).toLocaleDateString("no-nb", { dateStyle: "long" });
  const formattedTime = `${startTime}${endTime && ` - ${endTime}`}`;

  return (
    <div className="flex flex-col gap-8 p-8">
      {startDate && <Body1>{`📆 Dato: ${formattedDate}`}</Body1>}
      {startTime && <Body1>{`🕐 Tid: ${formattedTime}`}</Body1>}
      {venue && <Body1>{`📍 Sted: ${venue}`}</Body1>}
      {price && <Body1>{`💰 Pris: ${price}`}</Body1>}
      {courseHolders && courseHolders.length > 0 && <Body1>{`👨‍🏫 Kursholder: ${courseHolders.map(ch => ch.name).join(", ")}`}</Body1>}
    </div>
  );
};
