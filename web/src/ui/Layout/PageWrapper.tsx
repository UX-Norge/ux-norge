import * as React from "react";
import { Nav, Footer, NavProps } from "@Ui/Layout";
import { classNames } from "@Lib/helpers";
import { FooterProps } from "./Footer";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<IProps & FooterProps & NavProps> = ({
  children,
  className,
  showPartners,
  showNewsletter,
  hideSearch,
}) => {
  return (
    <>
      <Nav hideSearch={hideSearch} />
      <div className={classNames("flex-1", className)}>{children}</div>
      <Footer showPartners={showPartners} showNewsletter={showNewsletter} />
    </>
  );
};
