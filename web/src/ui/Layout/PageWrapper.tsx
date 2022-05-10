import * as React from "react";
import { Nav, Footer } from "@Ui/Layout";
import { classNames } from "@Lib/helpers";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const PageWrapper: React.FC<IProps> = ({ children, className }) => {
  return (
    <>
      <Nav />
      <div className={classNames("flex-1", className)}>{children}</div>
      <Footer />
    </>
  );
};
