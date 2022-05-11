import * as React from "react";
import { Image } from "@Ui/Image";
import { SanityImage } from "@Types";

interface IProps {
  image: SanityImage;
  alt: string;
  caption: string;
}

export const ArticleImage: React.FC<IProps> = ({ image, alt, caption }) => {
  if (!image) return null;

  return (
    <div className="-mx-24">
      <Image image={image} alt={alt} width={1200} className=" mb-8" />
      {caption && <figcaption className="mt-0 px-24">{caption}</figcaption>}
    </div>
  );
};
