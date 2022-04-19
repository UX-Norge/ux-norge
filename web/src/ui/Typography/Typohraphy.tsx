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
    <h1 className={"" + className} {...props}>
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
    <h2 className={"" + className} {...props}>
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
    <h3 className={"" + className} {...props}>
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
    <h4 className={"" + className} {...props}>
      {children}
    </h4>
  );
};
export const Body1: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <p className={"" + className} {...props}>
      {children}
    </p>
  );
};
export const Body2: React.FC<IProps> = ({ children, className, ...props }) => {
  return (
    <p className={"" + className} {...props}>
      {children}
    </p>
  );
};

export const Caption: React.FC<IProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={"" + className} {...props}>
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
    <p className={"" + className} {...props}>
      {children}
    </p>
  );
};
