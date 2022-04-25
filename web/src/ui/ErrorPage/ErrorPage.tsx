import { Body1, Body2, Heading2 } from "@Ui/Typography";
import { PageWrapper } from "@Ui/Layout";
import * as React from "react";

interface IProps {
  title: string;
  message: string;
  type: 500 | 404;
}

export const ErrorPage: React.FC<IProps> = ({ title, message }) => {
  return (
    <PageWrapper>
      <div className="mt-64 text-center">
        <Heading2>{title}</Heading2>
        <Body1>{message}</Body1>
        <Body2>Noen får si ifra på Slacken</Body2>
      </div>
    </PageWrapper>
  );
};
