import { Link } from "@Components/Link";
import { classNames } from "@Lib/helpers";
import { Article, ArticleImage, Author } from "@Types";
import { Door } from "@Ui/Door";
import { Image } from "@Ui/Image";
import { Body1, Overline } from "@Ui/Typography";
import * as React from "react";

type MainImageWithDimensions = ArticleImage & {
  image: {
    asset: {
      _id: string;
      metadata: { dimensions: { width: number; height: number } };
    };
  };
};

export const ArticleHeader: React.FC<
  Pick<Article, "title" | "authors" | "company" | "category" | "description" | "mainImage" | "isSponsoredContent">
> = ({ title, authors, company, category, mainImage, description, isSponsoredContent }) => {

  return (
    <header
      className={classNames(
        "relative max-w-full overflow-x-hidden border-b-2 border-gray-900 pt-64 lg:min-h-aboveFold",
        {
          "bg-primary-100":
            isSponsoredContent,
        }
      )}
      >
      <div
        className={classNames(
          "mx-auto grid h-full max-w-page gap-48 px-[10%] lg:min-h-aboveFold lg:grid-cols-[4fr_3fr]"
        )}
      >
        <div className="relative flex h-full items-center">
          <div className="relative z-10">
            { articleOverline(isSponsoredContent, category) }
            

            <h1 className="text-h2 font-bold md:text-h1 hyphens-auto">{title}</h1>
            <Body1>{description}</Body1>
            <div className="mt-16 flex space-x-8">
              { isSponsoredContent ? <Overline>{company.name}</Overline> : <Overline>{articleLinks(authors)}</Overline> }
            </div>
          </div>
          <Door
            classNameOuter="absolute bottom-0 left-[-20%] h-[25%] w-[15%] lg:block hidden"
            size="large"
            rounded="full"
          />
          <Door
            classNameOuter="absolute bottom-0 left-[-3%] h-[20%] w-[10%] lg:block hidden"
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

const articleOverline = (isSponsoredContent: boolean | undefined, category: any) => {
  if (isSponsoredContent) {
    return <Overline>Annonsørinnhold</Overline> 
  } else {
    if (category) {
      return <Link path={category.slug?.current} type="category" className="underline decoration-dotted">
              <Overline>{category.name}</Overline>
            </Link>
    }
  }
}

const articleLinks = (authors: Author[]) => {
  const everyAuthorIsFromSameCompany =
    authors.every(
      (author) => author.company?.name === authors[0].company?.name
    ) && authors.length > 1;
  const everyAuthorIsFromUxNorge = authors.every(
    (author) => author.company?.name === "UX Norge"
  );
  if (everyAuthorIsFromSameCompany && !everyAuthorIsFromUxNorge) {
    return (
      <>
        {authors.map((author, index) => (
          <span key={author._id || `author-${index}`}>
            <Link path={author.slug.current} type="author" className="underline decoration-dotted">{author.name}</Link>
            {index === authors.length - 1 ? '' : ', '}
          </span>
        ))}
        {' • '}{authors[0].company?.name}
      </>
    );
  }

  if (everyAuthorIsFromUxNorge) {
    return authors.map((author, index) => (
      <span key={author._id || `author-${index}`}>
        <Link path={author.slug.current} type="author" className="underline decoration-dotted">{author.name}</Link>
        {index === authors.length - 1 ? '' : ', '}
      </span>
    ));
  }

  return authors.map((author, index) => (
    <span key={author._id || `author-${index}`}>
      <Link path={author.slug.current} type="author" className="underline decoration-dotted">{author.name}</Link>
      {!!author.company ? ' • ' + author.company?.name : ''}
      {index === authors.length - 1 ? '' : ', '}
    </span>
  ));
};
