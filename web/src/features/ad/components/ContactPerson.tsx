import { Ad } from "@Types";
import { Button } from "@Ui/Button";
import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

export const ContactPerson: React.FC<
  Pick<
    Ad,
    | "contactName"
    | "contactEmail"
    | "contactPhone"
    | "contactName2"
    | "contactEmail2"
    | "contactPhone2"
    | "link"
    | "linkText"
  >
> = ({
  contactName,
  contactEmail,
  contactPhone,
  contactName2,
  contactEmail2,
  contactPhone2,
  link,
  linkText,
}) => {
  return (
    <div className="mb-24">
      {contactName && (
        <div className="mb-16">
          <Heading4>Kontaktperson:</Heading4>
          <Body1>{contactName}</Body1>
          {contactPhone && <Body1>{contactPhone}</Body1>}
          {contactEmail && <Body1>{contactEmail}</Body1>}
        </div>
      )}
      {contactName2 && (
        <div className="mb-16">
          <Heading4>Kontaktperson:</Heading4>
          <Body1>{contactName2}</Body1>
          {contactPhone2 && <Body1>{contactPhone2}</Body1>}
          {contactEmail2 && <Body1>{contactEmail2}</Body1>}
        </div>
      )}
      <br />
      <Button href={link}>{linkText || "Søk her"}</Button>
    </div>
  );
};
