import * as React from "react";
import { inputClassNames, InputProps } from "./lib/helpers";
import { Combobox, Listbox } from "@headlessui/react";
import { InputWrapper } from "./InputWrapper";
import { classNames } from "@Lib/helpers";

export const Dropdown: React.FC<
  InputProps & { options: { value: any; label: string }[] }
> = ({ name, value, onChange, label, options, helper, required }) => {
  const handleDropdown = (selectedOptionValue: any) => {
    onChange({ target: { value: selectedOptionValue.value, name } });
  };

  return (
    <InputWrapper label={label} helper={helper} required={required}>
      <Listbox onChange={handleDropdown} value={value} name={name}>
        <Listbox.Button
          className={classNames(inputClassNames.all, "text-left")}
        >
          {options?.find((option) => option?.value === value)?.label}
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 max-h-256 w-full overflow-y-auto rounded-xs border-2 border-primary-400 bg-white p-4">
          {options.map((option, index) => (
            <Listbox.Option
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
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </InputWrapper>
  );
};
