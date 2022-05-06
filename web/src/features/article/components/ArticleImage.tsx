import * as React from "react";
import { Image } from "@Ui/Image";
import { SanityImage } from "@Types";

interface IProps {
  image: SanityImage;
  alt: string;
  caption: string;
}

export const ArticleImage: React.FC<IProps> = ({ image, alt, caption }) => {
  console.log(image);

  if (!image) return null;

  return (
    <div>
      <Image image={image} alt={alt} width={1200} />
      {caption && <figcaption>{caption}</figcaption>}
    </div>
  );
};
