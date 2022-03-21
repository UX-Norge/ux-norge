import * as React from "react";
import SanityImage from "gatsby-plugin-sanity-image";

type HotspotAndCrop = {
  height: number;
  width: number;
  x: number;
  y: number;
};

interface IProps {
  image: { asset: object } | undefined;
  alt: string | undefined;
  className?: string;
  width: number;
  height?: number;
  crop?: HotspotAndCrop;
  hotspot?: HotspotAndCrop;
}

const Image: React.FC<IProps> = ({
  image,
  alt,
  width,
  height,
  crop,
  hotspot,
  className,
}) => {
  if (!!!image) return null;
  return (
    <SanityImage
      asset={image.asset}
      className={className}
      hotspot={hotspot}
      crop={crop}
      alt={alt}
      width={width}
      height={height}
      __typename={undefined}
      _type={undefined}
      _key={undefined}
      sources={undefined}
    />
  );
};

export default Image;
