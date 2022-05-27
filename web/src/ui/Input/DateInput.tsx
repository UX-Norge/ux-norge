import * as React from "react";
import { inputClassNames, InputProps } from "./lib/helpers";
import DatePicker from "react-date-picker";
import { InputWrapper } from "./InputWrapper";
import { classNames } from "@Lib/helpers";

export const DateInput: React.FC<InputProps> = ({
  label,
  helper,
  onChange,
  required,
  ...props
}) => {
  const handleDateChange = (date: Date) => {
    onChange({ target: { value: date, name: props.name } });
  };
  return (
    <InputWrapper label={label} helper={helper}>
      <DatePicker
        {...props}
        className={classNames(inputClassNames.all)}
        calendarClassName="rounded font-sans"
        onChange={handleDateChange}
      />
    </InputWrapper>
  );
};
