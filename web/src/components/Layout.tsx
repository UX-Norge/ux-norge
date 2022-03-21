import * as React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

interface IProps {}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
