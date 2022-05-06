import { Link } from "gatsby";
import * as React from "react";
import logo from "../../images/logo.svg";

interface IProps {}

export const Nav: React.FC<IProps> = () => {
  return (
    <nav className="bg-gray-100 p-8">
      <Link
        to="/"
        className="bg-black block h-32 w-32 rounded-full content-['']"
      >
        <img src={logo} className="h-full w-full" />
      </Link>
    </nav>
  );
};
