import * as React from "react";

import { InputWrapper } from "./InputWrapper";
import { inputClassNames, InputProps } from "./lib/helpers";

export const Textarea: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <InputWrapper label={label}>
      <textarea {...props} className={inputClassNames} />
    </InputWrapper>
  );
};
