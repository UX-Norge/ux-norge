import * as React from "react";
import Image from "./Image";

interface IProps {
  image: { asset: object };
  alt: string;
  caption: string;
}

const ArticleImage: React.FC<IProps> = ({ image, alt, caption }) => (
  <div>
    <Image image={image} alt={alt} width={1200} />
    {caption && <figcaption>{caption}</figcaption>}
  </div>
);

export default ArticleImage;
