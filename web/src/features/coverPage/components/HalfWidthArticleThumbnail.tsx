import { Article, ArticleThumbnail, SanityImage, SanitySlug } from "@Types";
import { Body1, Heading2 } from "@Ui/Typography";
import { Image } from "@Ui/Image";
import * as React from "react";
import { Link } from "gatsby";

export const HalfWidthArticleThumbnail: React.FC<ArticleThumbnail> = ({
  title,
  slug,
  description,
  mainImage,
}) => {
  return (
    <Link to={slug.current}>
      <Image image={mainImage} alt={title} width={1600} />
      <Heading2>{title}</Heading2>
    </Link>
  );
};
