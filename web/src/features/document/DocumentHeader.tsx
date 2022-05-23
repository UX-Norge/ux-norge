import { VectorIllustrations } from "@Images/VectorIllustrations";
import { Cta, Document } from "@Types";
import { Button } from "@Ui/Button";
import { Body1, Heading1 } from "@Ui/Typography";
import * as React from "react";

export const DocumentHeader: React.FC<
  Pick<Document, "title" | "description"> & { cta: Cta }
> = ({ title, description, cta }) => {
  const colors = [
    {
      foreground: "var(--color-primary-400)",
      background: "var(--color-primary-500)",
    },
    {
      foreground: "var(--color-yellow-200)",
      background: "var(--color-yellow-300)",
    },
    {
      foreground: "var(--color-green-500)",
      background: "var(--color-green-600)",
    },
  ];

  const color = colors[0 % colors.length];

  return (
    <header className="border-b-2 border-gray-900">
      <div className="mx-auto max-w-page gap-48 overflow-hidden px-24 pt-128 md:grid md:grid-cols-2">
        <div className="max">
          <Heading1>{title}</Heading1>
          <Body1>{description}</Body1>
          {cta && (
            <div className="mt-16">
              <Button href={cta.url}>{cta.text}</Button>
            </div>
          )}
        </div>
        <div>
          <VectorIllustrations.ShadowDoor
            foregroundColor={color.foreground}
            backgroundColor={color.background}
          />
        </div>
      </div>
    </header>
  );
};
