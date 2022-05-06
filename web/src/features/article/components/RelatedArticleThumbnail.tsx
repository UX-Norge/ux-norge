import { Link } from "@Components/Link";
import { Article } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading3, Overline } from "@Ui/Typography";
import * as React from "react";

export const RelatedArticleThumbnail: React.FC<
  Pick<Article, "title" | "mainImage" | "slug" | "description" | "category">
> = ({ title, mainImage, slug, description, category }) => {
  return (
    <Link
      path={slug.current}
      type="article"
      className="grid gap-16 sm:grid-cols-[1fr_300px] sm:items-center"
    >
      {mainImage && (
        <div className="aspect-w-4 aspect-h-3 sm:order-2">
          <Image
            image={mainImage?.image}
            width={800}
            alt={mainImage.alt}
            className="rounded-t object-cover"
          />
        </div>
      )}
      <div>
        {category && (
          <Overline className="text-primary-500">{category.name}</Overline>
        )}
        <Heading3>{title}</Heading3>
        <Body1>{description}</Body1>
      </div>
    </Link>
  );
};
