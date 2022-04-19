import { Article, ArticleThumbnail, SanityImage, SanitySlug } from "@Types";
import { Body1, Heading2 } from "@Ui/Typography";
import { Image } from "@Ui/Image";
import * as React from "react";
import { Link } from "gatsby";

export const FullWidthArticleThumbnail: React.FC<ArticleThumbnail> = ({
  title,
  slug,
  description,
  mainImage,
}) => {
  return (
    <Link to={slug.current} className="mb-24 block">
      <Image image={mainImage} alt={title} width={1600} />
      <Heading2>{title}</Heading2>
      <Body1>{description}</Body1>
    </Link>
  );
};
