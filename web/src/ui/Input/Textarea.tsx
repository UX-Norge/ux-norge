import * as React from "react";

import { InputWrapper } from "./InputWrapper";
import { inputClassNames, InputProps } from "./lib/helpers";

export const Textarea: React.FC<InputProps> = ({
  label,
  required,
  helper,
  ...props
}) => {
  return (
    <InputWrapper label={label} helper={helper} required={required}>
      <textarea
        {...props}
        className={inputClassNames.all}
        required={required}
      />
    </InputWrapper>
  );
};
