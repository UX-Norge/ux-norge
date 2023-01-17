import { classNames } from "@Lib/helpers";
import * as React from "react";

interface IProps {
  active: boolean;
  activeClassName?: string;
  className?: string;
  name: string;
  toggle: (name: string, wasSelected: boolean) => void;
}

export const ToggleButton: React.FC<IProps> = ({
  active,
  activeClassName = "",
  className,
  name,
  toggle,
}) => {
  return (
    <button
      className={classNames(
        "whitespace-nowrap rounded-full px-16 py-4 capitalize text-gray-900 transition-all",
        {
          [activeClassName]: active,
          "bg-blue-600 text-white hover:bg-blue-600": active,
          "ring-2 ring-blue-600 hover:ring-blue-600": !active,
        },
        className
      )}
      onClick={() => toggle(name, active)}
    >
      {name}
    </button>
  );
};
