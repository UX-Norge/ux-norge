import { VectorIllustrations } from "@Images/VectorIllustrations";
import { Cta, Document } from "@Types";
import { Button } from "@Ui/Button";
import { Body1, Heading1 } from "@Ui/Typography";
import * as React from "react";

export const CoursePageHeader: React.FC<
  Pick<Document, "title" | "description">
> = ({ title, description }) => {
  return (
    <header className="border-b-2 border-gray-900">
      <div className="relative mx-auto max-w-page gap-48 overflow-hidden px-24 pt-128">
        <div className="max-w-[715px]">
          <Heading1>{title}</Heading1>
          <Body1 className="rounded rounded-tl-none bg-primary-50 p-8">
            {description}
          </Body1>
        </div>
        <div>
          <VectorIllustrations.coursePageDoors
            foregroundColor={"var(--color-primary-400)"}
            backgroundColor={"var(--color-primary-100)"}
          />
        </div>
      </div>
    </header>
  );
};
