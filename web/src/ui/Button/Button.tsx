import * as React from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: any;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<IProps> = ({ children, onClick, href, type }) => {
  const buttonClass =
    "whitespace-nowrap rounded-xs bg-primary-500 px-16 py-8 font-base text-white";
  return href ? (
    <a href={href} className={buttonClass}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={buttonClass} type={type}>
      {children}
    </button>
  );
};
