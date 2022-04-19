import { ArticleThumbnail } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading2, Overline } from "@Ui/Typography";
import { Link } from "gatsby";
import * as React from "react";
import { SanityKeyed } from "sanity-codegen";

interface IProps {
  list: Array<SanityKeyed<ArticleThumbnail>>;
  type: "list" | "halfWidth" | "fullWidth" | undefined;
}

export const CoverArticleThumbnails: React.FC<IProps> = ({ list, type }) => {
  if (!type || !list) return null;
  console.log(list);

  // If type === "list"
  let options = {
    imageSize: 400,
    titleClass: "text-h4",
    bodyClass: "text-lg",
    wrapperClass: "",
    thumbnailClass: "grid gap-16 grid-cols-[1fr_3fr]",
    imageClass: "w-full rounded-t overflow-hidden",
  };
  if (type === "halfWidth") {
    options = {
      ...options,
      imageSize: 800,
      bodyClass: "text-md",
      wrapperClass: "grid grid-cols-2 gap-8",
      thumbnailClass: "mb-24",
      imageClass: "",
    };
  } else if (type === "fullWidth") {
    options = {
      ...options,
      imageSize: 1200,
      titleClass: "text-h1",
      bodyClass: "text-md",
      wrapperClass: "",
      thumbnailClass: "mb-24",
      imageClass: "",
    };
  }

  return (
    <div className={options.wrapperClass + " mb-24"}>
      {list.map(
        ({ article: { title, description, slug, mainImage, category } }) => {
          if (!title || !description || !slug || !mainImage) return null;

          return (
            <Link to={slug.current} className={options.thumbnailClass}>
              <div className={options.imageClass + " aspect-w-16 aspect-h-9"}>
                <Image
                  image={mainImage}
                  alt={title}
                  width={options.imageSize}
                  className={"w-full object-cover"}
                />
              </div>
              <div>
                {category?.name && <Overline>{category.name}</Overline>}
                <Heading2 className={options.titleClass}>{title}</Heading2>
                <Body1 className={options.bodyClass}>{description}</Body1>
              </div>
            </Link>
          );
        }
      )}
    </div>
  );
};
