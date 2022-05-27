import * as React from "react";

export const InputWrapper: React.FC<{
  label?: string;
  children: React.ReactNode;
  helper?: string;
  required?: boolean;
}> = ({ label, helper, required, children }) => {
  return (
    <div className="relative mb-16">
      {label && (
        <label>
          {label}
          {!required && (
            <span className="text-sm text-gray-600"> (Valgfri)</span>
          )}
        </label>
      )}
      {children}
      {helper && <p className="text-gray-500">{helper}</p>}
    </div>
  );
};
