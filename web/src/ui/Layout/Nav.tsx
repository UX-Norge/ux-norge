import { Link } from "@Components/Link";
import * as React from "react";
import logo from "@Images/logo-horizontal.svg";

interface IProps {}

export const Nav: React.FC<IProps> = () => {
  return (
    <nav className="flex items-center justify-between p-16">
      <Link
        type="page"
        path=""
        className="bg-black block rounded-full content-['']"
      >
        <img src={logo} className="h-48 w-auto" />
      </Link>
      <div className="lg:flex lg:space-x-48">
        <Link type="page" path="jobber" className="">
          Jobb
        </Link>
        <Link type="page" path="butikk" className="">
          Butikk
        </Link>
        <Link type="page" path="om" className="">
          Om oss
        </Link>
      </div>
    </nav>
  );
};
