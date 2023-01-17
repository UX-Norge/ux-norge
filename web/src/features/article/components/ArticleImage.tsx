import * as React from "react";
import { Image } from "@Ui/Image";
import { SanityImage } from "@Types";
import { BlockContent } from "@Ui/Typography";

interface IProps {
  image: SanityImage;
  alt: string;
  caption: string;
}

export const ArticleImage: React.FC<IProps> = ({ image, alt, caption }) => {
  if (!image) return null;

  const Caption = () => {
    if (!caption) return null;
    if (typeof caption === "string") {
      return <>{caption}</>;
    }
    return <BlockContent blocks={caption} />;
  };

  return (
    <div className="-mx-24">
      <Image image={image} alt={alt} width={1200} className=" mb-8" />
      <figcaption className="mt-0 px-24">
        <Caption />
      </figcaption>
    </div>
  );
};
