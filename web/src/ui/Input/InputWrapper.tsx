import * as React from "react";

export const InputWrapper: React.FC<{
  label?: string;
  children: React.ReactNode;
  helper?: string;
}> = ({ label, helper, children }) => {
  return (
    <div className="relative mb-16">
      {label && <label>{label}</label>}
      {children}
      {helper && <p className="text-gray-500">{helper}</p>}
    </div>
  );
};
