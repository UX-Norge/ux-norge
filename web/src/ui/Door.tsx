import { classNames } from "@Lib/helpers";
import { RoundedType, SanityImage } from "@Types";
import * as React from "react";
import { Image } from "./Image";

interface IProps {
  image?: SanityImage;
  rounded?: RoundedType;
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
  rounded = "lg",
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
    image?.asset ? (
      <Image {...props} image={image} alt={alt} width={width} height={height} />
    ) : (
      <div {...props} />
    );

  return (
    <div
      className={classNames(
        "bg-primary-900 group h-128 lg:rounded-t-lg",
        {
          "transition-transform": animate,
          "z-50": zIndex === "front",
          "-z-0": zIndex === "back",
          "w-full": size === "fluid",
          "bg-primary-500": image,
          "aspect-w-3 aspect-h-2": image,
        },
        `rounded-t-${rounded}`,
        classNameOuter
      )}
      style={{ height }}
    >
      <InnerDoor
        className={classNames(
          "group-hover:door-open group-focus:door-open h-full w-full origin-left origin-left bg-primary-400 object-cover transition-transform duration-700 ease-door lg:rounded-t-lg",
          `rounded-t-${rounded}`,
          classNameInner
        )}
      />
    </div>
  );
};
