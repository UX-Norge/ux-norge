import { Link, RouteTypes } from "@Components/Link";
import * as React from "react";
import logo from "@Images/logo-horizontal.svg";
import { classNames } from "@Lib/helpers";
import { navigate } from "gatsby";

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

const SearchIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.9265 17.0401L20.3996 20.4001M19.2796 11.4401C19.2796 15.77 15.7695 19.2801 11.4396 19.2801C7.1097 19.2801 3.59961 15.77 3.59961 11.4401C3.59961 7.11019 7.1097 3.6001 11.4396 3.6001C15.7695 3.6001 19.2796 7.11019 19.2796 11.4401Z"
      stroke="#5E5E63"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  return (
    <form
      className="flex items-center rounded-sm bg-gray-100 "
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/sok?searchTerm=${searchTerm}`);
      }}
    >
      <input
        className="rounded-sm bg-gray-100 py-8 px-16"
        placeholder="Finn en artikkel"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="px-8"
        type="submit"
        value="Submit"
        disabled={searchTerm === ""}
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export const Nav: React.FC<IProps> = () => {
  return (
    <nav className="flex items-center justify-between py-16 px-24 lg:px-48">
      <Link type="home" path="" ariaLabel="Hjem">
        <img src={logo} alt="Hjem, UX Norge Logo" className="h-48 w-auto" />
      </Link>
      <div className="flex items-center space-x-24 lg:space-x-48">
        <SearchBar />
        <NavItem
          name="Aktuelt"
          path=""
          type="home"
          className="hidden sm:block"
        />
        <NavItem name="Nettverk" path="nettverk" type="page" />
        <NavItem name="Jobb" path="jobb" type="page" />
      </div>
    </nav>
  );
};
