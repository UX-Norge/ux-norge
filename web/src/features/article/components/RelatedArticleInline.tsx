import * as React from "react";
import { Article } from "@Types";
import { Image } from "@Ui/Image";
import { Link } from "@Components/Link";

interface IProps {
  article: Article;
}

export const RelatedArticleInline: React.FC<IProps> = ({
  article: { mainImage, title, description, slug },
}) => {
  if (!slug) return null;
  return (
    <Link
      path={slug.current}
      type="article"
      className="not-prose grid grid-cols-2 gap-4 bg-gray-200 p-4"
    >
      {mainImage && (
        <Image
          image={mainImage.image}
          alt={title}
          width={400}
          className="m-0 p-0 block h-full object-cover"
        />
      )}
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};
