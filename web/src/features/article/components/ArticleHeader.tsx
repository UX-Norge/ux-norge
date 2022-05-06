import { Article, ArticleImage } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading1, Heading2, Overline } from "@Ui/Typography";
import * as React from "react";
import { classNames } from "@Lib/helpers";
import { Door } from "@Ui/Door";

type MainImageWithDimensions = ArticleImage & {
  image: {
    asset: {
      _id: string;
      metadata: { dimensions: { width: number; height: number } };
    };
  };
};

export const ArticleHeader: React.FC<
  Pick<Article, "title" | "authors" | "category" | "description" | "mainImage">
> = ({ title, authors, category, mainImage, description }) => {
  const mainImageWithDimensions = mainImage as MainImageWithDimensions;

  const dimensions: { width: number; height: number } =
    mainImageWithDimensions?.image.crop ||
    mainImageWithDimensions?.image.asset.metadata.dimensions;

  const layout: "portrait" | "landscape" =
    (dimensions && dimensions.width > dimensions.height) || !mainImage
      ? "landscape"
      : "portrait";

  const authorNames = authors.map((author) => author.name).join(", ");
  let authorCompany = authors[0]?.company?.name;
  authorCompany = authorCompany === "UX Norge" ? undefined : authorCompany;

  return (
    <header className="relative h-aboveFold border-b-2 border-gray-900 pt-64">
      <div className={classNames("grid h-full grid-cols-[4fr_3fr] px-[10%]")}>
        <div className="relative flex h-full items-center">
          <div>
            {category && <Overline>{category.name}</Overline>}
            <Heading2>{title}</Heading2>
            <Body1>{description}</Body1>
            <div className="mt-16 flex space-x-16">
              {authorNames && <Overline>{authorNames}</Overline>}
              {authorCompany && <Overline>{authorCompany}</Overline>}
            </div>
          </div>
          <Door
            classNameOuter="bottom-0 left-[-20%] h-[32%] w-[15%]"
            size="large"
          />
          <Door
            classNameOuter="bottom-0 left-[-3%] h-[25%] w-[10%]"
            size="large"
          />
        </div>
        <div className="relative flex h-full items-end">
          {mainImage && (
            <Image
              image={mainImage.image}
              width={1600}
              alt={mainImage.alt}
              title={mainImage.caption}
              className="door z-10 h-[90%] w-full rounded-t-xl object-cover"
            />
          )}
          <Door
            classNameOuter="bottom-0 left-[70%] h-[50%] w-[50%]"
            size="large"
            rounded="full"
          />
        </div>
      </div>
    </header>
  );
};
