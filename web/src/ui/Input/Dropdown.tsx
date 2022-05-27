import * as React from "react";
import { inputClassNames, InputProps } from "./lib/helpers";
import { Combobox } from "@headlessui/react";
import { InputWrapper } from "./InputWrapper";
import { classNames } from "@Lib/helpers";

export const Dropdown: React.FC<
  InputProps & { options: { value: any; label: string }[] }
> = ({ name, value, onChange, label, options, helper, ...props }) => {
  const [query, setQuery] = React.useState("");
  const handleDropdown = (selectedOptionValue: any) => {
    onChange({ target: { value: selectedOptionValue, name } });
  };
  const handleQuery = (e: any) => {
    setQuery(e.target.value);
  };

  const filteredOptions =
    query === ""
      ? options
      : options.filter(({ label }) =>
          label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <InputWrapper label={label} helper={helper}>
      <Combobox onChange={handleDropdown} value={value} name={name}>
        <Combobox.Input
          className={inputClassNames.all}
          displayValue={(value: any) => value.label}
          onChange={handleQuery}
        />
        <Combobox.Options className="absolute top-full z-10 max-h-256 w-full overflow-y-auto rounded-xs border-2 border-primary-400 bg-white p-4">
          {filteredOptions.map((option, index) => (
            <Combobox.Option
              key={`option-${index}`}
              value={option}
              as={React.Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    "cursor-pointer rounded-xs py-8 px-16",
                    {
                      "bg-primary-100": active && !selected,
                      "bg-primary-500 text-white": selected,
                    }
                  )}
                >
                  {option.label}
                </li>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </InputWrapper>
  );
};
