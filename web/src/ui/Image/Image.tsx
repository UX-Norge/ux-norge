import * as React from "react";
import Img from "gatsby-plugin-sanity-image";
import { SanityImage } from "@Types";

type HotspotAndCrop = {
  height: number;
  width: number;
  x: number;
  y: number;
};

interface IProps {
  image: SanityImage | undefined;
  alt: string | undefined;
  title: string | undefined;
  className?: string;
  width: number;
  height?: number;
  crop?: HotspotAndCrop;
  hotspot?: HotspotAndCrop;
}

export const Image: React.FC<IProps> = ({
  image,
  alt,
  width,
  height,
  crop,
  hotspot,
  className,
  title,
}) => {
  if (!!!image) return null;
  return (
    <Img
      asset={image.asset}
      className={className}
      hotspot={hotspot}
      crop={crop}
      alt={alt}
      title={title}
      width={width}
      height={height}
      __typename={undefined}
      _type={undefined}
      _key={undefined}
      sources={undefined}
    />
  );
};
