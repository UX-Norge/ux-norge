import { Link } from "gatsby";
import * as React from "react";

interface IProps {}

export const Nav: React.FC<IProps> = () => {
  return (
    <nav className="bg-gray-100 p-8">
      <Link
        to="/"
        className="block h-24 w-24 rounded-full bg-black content-['']"
      ></Link>
    </nav>
  );
};
