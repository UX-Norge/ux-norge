import { classNames } from "@Lib/helpers";
import { ArticleImage } from "@Types";
import { Door } from "@Ui/Door";
import { Image } from "@Ui/Image";
import { Body1, Overline } from "@Ui/Typography";
import * as React from "react";

interface IProps {
  title: string;
  description?: string;
  mainImage?: ArticleImage | null;
  companyName: string;
}

export const PartnerHeader: React.FC<IProps> = ({
  title,
  description,
  mainImage,
  companyName,
}) => {
  return (
    <header
      className={classNames(
        "relative max-w-full overflow-x-hidden border-b-2 border-gray-900 bg-primary-100 pt-64 lg:min-h-aboveFold"
      )}
    >
      <div className="mx-auto grid h-full max-w-page gap-48 px-[10%] lg:min-h-aboveFold lg:grid-cols-[4fr_3fr]">
        <div className="relative flex h-full items-center">
          <div className="relative z-10">
            <Overline>Partner</Overline>
            <h1 className="hyphens-auto text-h2 font-bold md:text-h1">
              {title}
            </h1>
            {description && <Body1>{description}</Body1>}
            <div className="mt-16 flex space-x-8">
              <Overline>{companyName}</Overline>
            </div>
          </div>
          <Door
            classNameOuter="absolute bottom-0 left-[-20%] hidden h-[25%] w-[15%] lg:block"
            size="large"
            rounded="full"
          />
          <Door
            classNameOuter="absolute bottom-0 left-[-3%] hidden h-[20%] w-[10%] lg:block"
            size="large"
            rounded="full"
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
