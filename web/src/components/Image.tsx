import * as React from "react";
import SanityImage from "gatsby-plugin-sanity-image";

type HotspotAndCrop = {
  height: number;
  width: number;
  x: number;
  y: number;
};

interface IProps {
  image: { asset: object };
  alt: string;
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
}) => {
  return (
    <SanityImage
      asset={image.asset}
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
