import * as React from "react";
import { InputWrapper } from "./InputWrapper";
import { inputClassNames, InputProps } from "./lib/helpers";

export const Input: React.FC<InputProps> = ({
  label,
  helper,
  required,
  ...props
}) => {
  return (
    <InputWrapper label={label} helper={helper} required={required}>
      <input {...props} className={inputClassNames.all} required={required} />
    </InputWrapper>
  );
};
