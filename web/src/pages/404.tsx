import * as React from "react";
import { PageWrapper } from "@Ui/Layout";
import { Body1, Heading1 } from "@Ui/Typography";
import illustration from "@Images/404-illustration.png";

const NotFoundPage = () => {
  return (
    <PageWrapper showNewsletter={false} showPartners={false}>
      <div className="p-24 text-center">
        <Heading1 className="text-[110px]">404</Heading1>
        <p className="mx-auto max-w-prose text-h3 font-bold">
          Vi finner dessverre ikke døren du prøver å åpne. Gå tilbake til
          forsiden{" "}
        </p>
        <img
          src={illustration}
          className="mx-auto mt-64 w-[800px] max-w-full"
        />
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
