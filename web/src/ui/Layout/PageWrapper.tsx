import * as React from "react";
import { Nav, Footer } from "@Ui/Layout";
import { classNames } from "@Lib/helpers";
import { FooterProps } from "./Footer";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<IProps & FooterProps> = ({
  children,
  className,
  showPartners,
  showNewsletter,
}) => {
  return (
    <>
      <Nav />
      <div className={classNames("flex-1", className)}>{children}</div>
      <Footer showPartners={showPartners} showNewsletter={showNewsletter} />
    </>
  );
};
