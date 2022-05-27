import * as React from "react";
import { InputProps } from "./lib/helpers";
import DatePicker from "react-date-picker";
import { InputWrapper } from "./InputWrapper";

export const DateInput: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <InputWrapper label={label}>
      <DatePicker {...props} />
    </InputWrapper>
  );
};
