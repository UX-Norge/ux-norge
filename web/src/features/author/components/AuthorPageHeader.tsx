import { classNames } from "@Lib/helpers";
import { Author } from "@Types";
import { Image } from "@Ui/Image";
import { BlockContent, Body1, Heading1, Overline } from "@Ui/Typography";
import * as React from "react";

export const AuthorPageHeader: React.FC<Author> = ({
  name,
  bio,
  image,
  email,
  company,
}) => {
  return (
    <header
      className={classNames(
        "mb-64 grid items-end gap-48 md:grid-cols-[400px_1fr]",
        { "items-end": bio, "items-center": !bio }
      )}
    >
      {image && (
        <div className="relative">
          <div className="aspect-w-5 aspect-h-6">
            <Image
              image={image}
              alt={name}
              width={600}
              className="z-10 w-[80%] rounded-t-full object-cover"
            />
          </div>
          <div className="-r-16 absolute bottom-0 h-5/6 w-full rounded-t-full bg-yellow-200 " />
        </div>
      )}
      <div>
        {company && (
          <Overline className="text-yellow-500">{company.name}</Overline>
        )}
        <Heading1>{name}</Heading1>
        {email && <Overline className="text-yellow-500">{email}</Overline>}
        {bio && <BlockContent blocks={bio} />}
      </div>
    </header>
  );
};
