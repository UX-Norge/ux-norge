import * as React from "react";

export const InputWrapper: React.FC<{
  label?: string;
  children: React.ReactNode;
}> = ({ label, children }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
};
