import { Link } from "gatsby";
import * as React from "react";
import { Article } from "@Types";
import { Image } from "@Ui/Image";

interface IProps {
  article: Article;
}

export const RelatedArticleInline: React.FC<IProps> = ({
  article: { mainImage, title, description, slug },
}) => {
  if (!slug) return null;
  return (
    <Link
      to={"/" + slug.current}
      className="grid grid-cols-2 gap-4 bg-gray-200 p-4"
    >
      <Image
        image={mainImage}
        alt={title}
        width={400}
        className="m-0 block h-full object-cover"
      />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};
