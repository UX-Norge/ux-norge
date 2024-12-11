import * as React from "react";
import { Article } from "@Types";
import { Image } from "@Ui/Image";
import { Link } from "@Components/Link";
import { Body2, Heading3, Overline } from "@Ui/Typography";

interface IProps {
  inlineRelatedArticle: Article;
}

export const RelatedArticleInline: React.FC<IProps> = ({
  inlineRelatedArticle: { mainImage, title, description, slug, category },
}) => {
  if (!slug) return null;
  return (
    <Link
      path={slug.current}
      type="article"
      className="not-prose grid items-center gap-24 rounded-sm bg-primary-100 p-8 decoration-transparent md:grid-cols-2 md:pr-24"
    >
      {mainImage && (
        <Image
          image={mainImage.image}
          alt={title}
          width={400}
          className="m-0 block rounded-sm object-cover p-0"
        />
      )}
      <div className="text-gray-900">
        <Overline>{category.name}</Overline>
        <Heading3>{title}</Heading3>
        <Body2 className="text-sm">{description}</Body2>
      </div>
    </Link>
  );
};
