import * as React from "react";
import { InputWrapper } from "./InputWrapper";
import { inputClassNames, InputProps } from "./lib/helpers";

export const Input: React.FC<InputProps> = ({
  name,
  label,
  helper,
  required,
  ...props
}) => {
  return (
    <InputWrapper id={name} label={label} helper={helper} required={required}>
      <input
        id={name}
        name={name}
        className={inputClassNames.all}
        required={required}
        {...props}
      />
    </InputWrapper>
  );
};
