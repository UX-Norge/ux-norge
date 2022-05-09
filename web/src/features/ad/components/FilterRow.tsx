import { classNames } from "@Lib/helpers";
import * as React from "react";

interface IProps {
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterRow: React.FC<IProps> = ({
  options,
  selected,
  setSelected,
}) => {
  const ALL_STRING = "Alle";
  const toggle = (option: string) => {
    if (option === ALL_STRING) {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    const wasSelected = selected.includes(option);
    if (wasSelected) {
      setSelected(selected.filter((s) => s !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  const Toggle = ({ option }: { option: string }) => (
    <button
      className={classNames(
        "rounded-full border-2 border-green-300 px-8 py-2 text-sm capitalize transition-colors hover:border-green-500 hover:bg-green-500",
        {
          "bg-green-300":
            selected.includes(option) ||
            (option === ALL_STRING && selected.length === options.length),
        }
      )}
      onClick={() => toggle(option)}
    >
      {option}
    </button>
  );

  return (
    <div className="mb-8 space-x-8">
      <Toggle option={ALL_STRING} />
      {options.map((option) => (
        <Toggle option={option} />
      ))}
    </div>
  );
};
