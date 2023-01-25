import { VectorIllustrations } from "@Images/VectorIllustrations";
import { Cta, Document } from "@Types";
import { Button } from "@Ui/Button";
import { Body1, Heading1 } from "@Ui/Typography";
import * as React from "react";

export const PageHeader: React.FC<
  Pick<Document, "title" | "description"> & {
    doors: JSX.Element;
    h1Class?: string;
    descriptionClass?: string;
  }
> = ({ title, description, doors, h1Class, descriptionClass }) => {
  return (
    <header className="overflow-hidden border-b-2 border-gray-900">
      <div className="relative mx-auto max-w-page gap-48 px-24 pt-128">
        <div className="max-w-prose">
          <Heading1 className={h1Class}>{title}</Heading1>
          <Body1 className={descriptionClass}>{description}</Body1>
        </div>
      </div>
      {doors}
    </header>
  );
};
