import { Article } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading3 } from "@Ui/Typography";
import { Link } from "gatsby";
import * as React from "react";

export const CoverArticleThumbnail: React.FC<
  Pick<Article, "title" | "mainImage" | "description" | "slug">
> = ({ title, mainImage, description, slug }) => {
  return (
    <Link to={slug.current}>
      {mainImage && (
        <Image image={mainImage.image} width={800} alt={mainImage.alt} />
      )}
      <Heading3>{title}</Heading3>
      <Body1>{description}</Body1>
    </Link>
  );
};
