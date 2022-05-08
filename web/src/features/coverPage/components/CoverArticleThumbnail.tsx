import * as React from "react";
import { Article } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Body2, Heading2, Heading3, Overline } from "@Ui/Typography";
import { Link } from "@Components/Link";
import { Door } from "@Ui/Door";
import { classNames } from "@Lib/helpers";

interface IProps {
  article: Article;
  type: "feature" | "small" | "list";
  className?: string;
}

export const CoverArticleThumbnail: React.FC<IProps> = ({
  article: { title, mainImage, description, slug, category },
  type,
  className,
}) => {
  return (
    <Link
      path={slug.current}
      type="article"
      className={classNames("group block", className)}
    >
      {mainImage && (
        <Door
          image={mainImage.image}
          width={800}
          size="fluid"
          height={{ feature: 500, small: 200, list: 200 }[type]}
          alt={mainImage.alt}
          rounded="large"
        />
      )}
      <Overline className="mt-8">{category.name}</Overline>
      <Heading2
        className={classNames({
          "text-h2": type === "feature",
          "text-h3": type === "small" || type === "list",
        })}
      >
        {title}
      </Heading2>
      <Body1>{description}</Body1>
    </Link>
  );
};
