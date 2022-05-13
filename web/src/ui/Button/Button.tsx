import { Link } from "@Components/Link";
import { classNames } from "@Lib/helpers";
import * as React from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: any;
  href?: string;
  type?: "button" | "submit" | "reset";
  color?: "primary" | "gray" | "yellow";
}

export const Button: React.FC<IProps> = ({
  children,
  onClick,
  href,
  type,
  color = "gray",
}) => {
  const buttonClass = classNames(
    "whitespace-nowrap rounded-xs px-16 py-8 font-base text-white transition-colors",
    {
      "bg-gray-900 text-white hover:bg-gray-800": color === "gray",
      "bg-primary-800 text-white hover:bg-primary-700": color === "primary",
      "bg-yellow-200 text-white hover:bg-yellow-300": color === "yellow",
    }
  );
  if (!href) {
    return (
      <button onClick={onClick} className={buttonClass} type={type}>
        {children}
      </button>
    );
  } else if (href.includes("http")) {
    return (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    );
  } else {
    return (
      <Link path={href} type="page" className={buttonClass}>
        {children}
      </Link>
    );
  }
};
