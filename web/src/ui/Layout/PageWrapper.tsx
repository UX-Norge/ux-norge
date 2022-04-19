import * as React from "react";
import { Nav, Footer } from "@Ui/Layout";

interface IProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
};
