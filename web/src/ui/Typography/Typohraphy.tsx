import { classNames } from "@Lib/helpers";
import * as React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading1: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1 className={classNames("text-h1 font-bold", className)} {...props}>
      {children}
    </h1>
  );
};

export const Heading2: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2 className={classNames("text-h2 font-bold", className)} {...props}>
      {children}
    </h2>
  );
};
export const Heading3: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3 className={classNames("text-h3 font-bold", className)} {...props}>
      {children}
    </h3>
  );
};
export const Heading4: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h4 className={classNames("text-h4 font-bold", className)} {...props}>
      {children}
    </h4>
  );
};
export const Body1: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <p
      className={classNames("text-base leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
};
export const Body2: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <p className={classNames("text-sm", className)} {...props}>
      {children}
    </p>
  );
};

export const Overline: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={classNames(
        "font-mono text-sm",
        {
          "text-primary-500": !className?.includes("text-"),
        },
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};
