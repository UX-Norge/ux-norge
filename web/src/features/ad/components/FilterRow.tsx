import { ToggleButton } from "@Components/ToggleButton";
import { classNames } from "@Lib/helpers";
import { Body1, Body2 } from "@Ui/Typography";
import * as React from "react";
import { ALL_STRING } from "../../../pages/jobb";

interface IProps {
  allString: string;
  options: string[];
  selected: string[];
  label: string;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterRow: React.FC<IProps> = ({
  allString,
  options,
  selected,
  setSelected,
  label,
}) => {
  const toggle = (option: string, wasSelected: boolean) => {
    if (option === allString) {
      !wasSelected && setSelected([allString]);
      return;
    }
    selected = selected.filter(
      (selectedOption) => selectedOption !== allString
    );
    selected = wasSelected
      ? selected.filter((s) => s !== option)
      : [...selected, option];

    if (selected.length === 0) selected = [allString];
    setSelected(selected);
  };

  return (
    <div>
      <Body1 className="mb-4 pl-24">{label}</Body1>
      <div className="mb-8 flex w-full flex-nowrap space-x-8 overflow-x-auto overflow-y-visible p-2 pr-24">
        <ToggleButton
          name={allString}
          toggle={toggle}
          className="ml-24"
          active={selected.includes(allString)}
        />
        {options.map((option) => (
          <ToggleButton
            name={option}
            toggle={toggle}
            active={selected.includes(option)}
          />
        ))}
      </div>
    </div>
  );
};
