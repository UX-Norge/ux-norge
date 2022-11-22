import { Ad } from "@Types";
import { Button } from "@Ui/Button";
import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

interface IProps {}

export const ContactPerson: React.FC<
  Pick<
    Ad,
    "contactName" | "contactEmail" | "contactPhone" | "link" | "linkText"
  >
> = ({ contactName, contactEmail, contactPhone, link, linkText }) => {
  return (
    <div className="mb-24">
      {contactName && (
        <>
          <Heading4>Kontaktperson:</Heading4>
          <Body1>{contactName}</Body1>
          {contactPhone && <Body1>{contactPhone}</Body1>}
          {contactEmail && <Body1>{contactEmail}</Body1>}
        </>
      )}
      <br />
      <Button href={link}>{linkText || "Søk her"}</Button>
    </div>
  );
};
