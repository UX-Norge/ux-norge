import { Article, ArticleImage } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading1, Heading2, Overline } from "@Ui/Typography";
import * as React from "react";
import { classNames } from "@Lib/helpers";
import { Door } from "@Ui/Door";
import { Link } from "@Components/Link";

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
  const authorNames = authors.map((author) => author.name).join(", ");
  let authorCompany = authors[0]?.company?.name;
  authorCompany = authorCompany === "UX Norge" ? undefined : authorCompany;

  return (
    <header className="relative border-b-2 border-gray-900 pt-64 lg:h-aboveFold">
      <div
        className={classNames(
          "mx-auto grid h-full max-w-page gap-48 px-[10%] lg:grid-cols-[4fr_3fr]"
        )}
      >
        <div className="relative flex h-full items-center">
          <div className="relative z-10">
            {category && (
              <Link path={category.slug.current} type="category">
                <Overline>{category.name}</Overline>
              </Link>
            )}
            <Heading1>{title}</Heading1>
            <Body1>{description}</Body1>
            <div className="mt-16 flex space-x-16">
              {authorNames && <Overline>{authorNames}</Overline>}
              {authorCompany && <Overline>{authorCompany}</Overline>}
            </div>
          </div>
          <Door
            classNameOuter="absolute bottom-0 left-[-20%] h-[32%] w-[15%] lg:block hidden"
            size="large"
          />
          <Door
            classNameOuter="absolute bottom-0 left-[-3%] h-[25%] w-[10%] lg:block hidden"
            size="large"
          />
        </div>
        <div className="relative flex h-full items-end">
          {mainImage && (
            <div className="aspect-w-5 aspect-h-6 relative z-10 h-full w-full lg:h-[90%]">
              <Image
                image={mainImage.image}
                width={1600}
                alt={mainImage.alt}
                title={mainImage.caption}
                className="door h-full w-full rounded-t-xl object-cover"
              />
            </div>
          )}
          <Door
            classNameOuter="absolute bottom-0 right-[70%] h-[40%] w-[50%] lg:hidden"
            size="large"
            rounded="full"
          />
          <Door
            classNameOuter="absolute bottom-0 left-[70%] h-[70%] w-[50%]"
            size="large"
            rounded="full"
          />
        </div>
      </div>
    </header>
  );
};
