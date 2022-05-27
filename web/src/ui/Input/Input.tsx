import * as React from "react";
import { InputWrapper } from "./InputWrapper";
import { inputClassNames, InputProps } from "./lib/helpers";

export const Input: React.FC<InputProps> = ({ label, helper, ...props }) => {
  return (
    <InputWrapper label={label} helper={helper}>
      <input {...props} className={inputClassNames.all} />
    </InputWrapper>
  );
};
