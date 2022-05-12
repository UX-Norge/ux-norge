import { Link, RouteTypes } from "@Components/Link";
import * as React from "react";
import logo from "@Images/logo-horizontal.svg";
import { classNames } from "@Lib/helpers";

interface IProps {}

interface NavItemProps {
  name: string;
  type: RouteTypes;
  path: string;
  className?: string;
  activeClassName?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  name,
  type,
  path,
  className,
  activeClassName,
}): JSX.Element => (
  <Link
    type={type}
    path={path}
    className={classNames("", className)}
    activeClassName={classNames("border-b-2 border-gray-900", activeClassName)}
  >
    {name}
  </Link>
);

export const Nav: React.FC<IProps> = () => {
  return (
    <nav className="flex items-center justify-between py-16 px-24 lg:px-48">
      <Link type="home" path="" ariaLabel="Hjem">
        <img src={logo} alt="Hjem, UX Norge Logo" className="h-48 w-auto" />
      </Link>
      <div className="lg:flex lg:space-x-48">
        <NavItem name="Aktuelt" path="" type="home" />
        <NavItem name="Nettverk" path="nettverk" type="page" />
        <NavItem name="Jobb" path="jobb" type="page" />
      </div>
    </nav>
  );
};
