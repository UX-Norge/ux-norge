import { ToggleButton } from "@Components/ToggleButton";
import { Body1 } from "@Ui/Typography";
import * as React from "react";

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
      <Body1 className="text-black mb-4">{label}</Body1>
      <div className="mb-8 flex w-full flex-wrap gap-8 p-2 pr-24">
        <ToggleButton
          name={allString}
          toggle={toggle}
          active={selected.includes(allString)}
        />
        {options.map((option) => (
          <ToggleButton
            name={option}
            key={option}
            toggle={toggle}
            active={selected.includes(option)}
          />
        ))}
      </div>
    </div>
  );
};
