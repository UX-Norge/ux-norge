import * as React from "react";
import { Article, RoundedType } from "@Types";
import { Overline } from "@Ui/Typography";
import { Link } from "@Components/Link";
import { Door } from "@Ui/Door";
import { classNames } from "@Lib/helpers";

interface IProps {
  article: Article;
  type: "feature" | "small" | "list";
  className?: string;
  rounded?: RoundedType;
}

export const ArticleThumbnail: React.FC<IProps> = ({
  article: { title, coverPageTitle, mainImage, description, slug, category, company, isSponsoredContent },
  rounded = "lg",
  type,
  className,
}) => {
  if (!slug?.current || !title) return null;
  return (
    <Link
      path={slug.current}
      type="article"
      className={classNames(
        "group block",
        {
          "grid grid-cols-1 items-center md:grid-cols-[1fr_300px] md:gap-48":
            type === "list",
        },
        {
          "bg-primary-100 lg:rounded-t-lg w-full p-16 rounded-t-lg":
            isSponsoredContent,
        },
        className
      )}
    >
      { isSponsoredContent ?
        <div
          className={classNames(
            "bg-primary-100 inline-block lg:rounded-br-lg pb-4 pe-12 rounded-br-lg",
            {
              "absolute z-10":
                mainImage,
            }
          )}
          >
            <p className="text-sm font-bold text-primary-700">
              Annonseinnhold
            </p>
        </div> :
        ''
      }
      {mainImage && (
        <Door
          image={mainImage.image}
          width={800}
          size="fluid"
          alt={mainImage.alt}
          rounded={rounded}
          classNameOuter={classNames({
            "aspect-w-3 aspect-h-2 md:order-1": type === "list",
          })}
        />
      )}
      <div className={classNames({ "p-24": type === "feature" })}>
        { category && <Overline className="mt-8">{category.name}</Overline>}
        <h2
          className={classNames("font-bold", {
            "break-words text-h2 xl:text-h1": type === "feature",
            "text-h4 md:text-h3": type === "small" || type === "list",
          })}
        >
          {coverPageTitle || title}
        </h2>
        <p
          className={classNames("leading-relaxed", {
            "text-sm": type === "small" || type === "list",
          })}
        >
          {description}
        </p>
      </div>
    </Link>
  );
};
