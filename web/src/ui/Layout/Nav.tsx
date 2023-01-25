import { Link, RouteTypes } from "@Components/Link";
import * as React from "react";
import logo from "@Images/logo-horizontal.svg";
import logoMobile from "@Images/logo.svg";
import { classNames } from "@Lib/helpers";
import { Search } from "@Ui/Input/Search";
import { navigate } from "gatsby";
import { VectorIllustrations } from "@Images/VectorIllustrations";

export interface NavProps {
  hideSearch?: boolean;
}

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
    className={classNames(
      "rounded-sm bg-gray-100 py-12 px-16 text-center md:rounded-none md:bg-transparent md:px-0 md:py-0 md:text-left",
      className
    )}
    activeClassName={classNames("border-b-2 border-gray-900", activeClassName)}
  >
    {name}
  </Link>
);

export const Nav: React.FC<NavProps> = ({ hideSearch }) => {
  const search = (searchTerm: string) => {
    navigate(`/sok?searchTerm=${searchTerm}`);
  };

  const [hamburger, setHamburger] = React.useState(false);
  const NavItems = () => (
    <>
      {(!hideSearch || hamburger) && (
        <Search onSubmit={search} placeholder="Finn en artikkel" />
      )}
      <NavItem name="Aktuelt" path="" type="home" className="hidden sm:block" />
      <NavItem name="Nettverk" path="nettverk" type="page" />
      <NavItem name="Kurs" path="kurs" type="page" />
      <NavItem name="Jobb" path="jobb" type="page" />
    </>
  );

  return (
    <nav
      className={classNames({
        "fixed z-50 h-full w-full bg-white md:static md:h-auto md:bg-transparent":
          hamburger,
      })}
    >
      <div className="flex items-center justify-between py-16 px-24 lg:px-48">
        <Link type="home" path="" ariaLabel="Hjem">
          <img
            src={logo}
            alt="Hjem, UX Norge Logo"
            className="hidden h-48 w-auto md:block"
          />
          <img
            src={logoMobile}
            alt="Hjem, UX Norge Logo"
            className="h-48 w-auto md:hidden"
          />
        </Link>
        <div className="hidden items-center space-x-24 md:flex lg:space-x-48">
          <NavItems />
        </div>
        <button className="md:hidden" onClick={() => setHamburger(!hamburger)}>
          <VectorIllustrations.hamburger />
        </button>
      </div>
      {hamburger && (
        <div className="flex flex-col gap-32 px-24 pb-56 pt-24 md:hidden">
          <NavItems />
          <div className="fixed bottom-0 left-[5px] h-[166px] w-[81px] rounded-t-full bg-primary-400" />
          <div className="fixed bottom-0 left-[95px] h-[86px] w-[35px] rounded-t-full bg-primary-400" />
          <div className="fixed bottom-0 right-[-60px] h-[166px] w-[199px] rounded-t-full bg-primary-400" />
        </div>
      )}
    </nav>
  );
};
