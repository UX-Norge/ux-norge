import { classNames } from "@Lib/helpers";
import { SanityImage } from "@Types";
import * as React from "react";

interface IProps {
  rounded?: "full" | "large" | "default";
  image?: SanityImage;
  size?: "fluid" | "large" | "medium" | "small";
  zIndex?: "front" | "back";
  classNameOuter?: string;
  classNameInner?: string;
  animate?: boolean;
}

export const Door: React.FC<IProps> = ({
  rounded = "full",
  image,
  size = "fluid",
  zIndex = "back",
  animate = true,
  classNameOuter,
  classNameInner,
}) => {
  return (
    <div
      className={classNames(
        "z- group absolute h-128 w-64 overflow-hidden rounded-t-full bg-gray-900",
        {
          "transition-transform": animate,
          "z-50": zIndex === "front",
          "-z-0": zIndex === "back",
        },
        classNameOuter
      )}
    >
      <div
        className={classNames(
          "group-hover:door-open duration-600 ease-door h-full w-full origin-left rounded-t-full bg-primary-400 transition-transform",
          classNameInner
        )}
      />
    </div>
  );
};
