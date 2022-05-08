import { classNames } from "@Lib/helpers";
import { SanityImage } from "@Types";
import * as React from "react";
import { Image } from "./Image";

interface IProps {
  rounded?: "full" | "large" | "default";
  image?: SanityImage;
  size?: "fluid" | "large" | "medium" | "small";
  zIndex?: "front" | "back";
  classNameOuter?: string;
  classNameInner?: string;
  animate?: boolean;
  width?: number;
  height?: number;
  alt?: string;
}

export const Door: React.FC<IProps> = ({
  rounded = "full",
  image,
  size = "fluid",
  width,
  height,
  alt,
  zIndex = "back",
  animate = true,
  classNameOuter,
  classNameInner,
}) => {
  const InnerDoor = (props: any) =>
    image ? (
      <Image {...props} image={image} alt={alt} width={width} height={height} />
    ) : (
      <div {...props} />
    );

  return (
    <div
      className={classNames(
        "group h-128 w-64 rounded-t-full bg-gray-900",
        {
          "transition-transform": animate,
          "z-50": zIndex === "front",
          "-z-0": zIndex === "back",
          "w-full": size === "fluid",
          "rounded-t-lg": rounded === "large",
          "bg-primary-500": image,
        },
        classNameOuter
      )}
      style={{ height }}
    >
      <InnerDoor
        className={classNames(
          "group-hover:door-open h-full w-full origin-left rounded-t-full bg-primary-400 object-cover transition-transform duration-700 ease-door",
          {
            "rounded-t-lg": rounded === "large",
          },
          classNameInner
        )}
      />
    </div>
  );
};
