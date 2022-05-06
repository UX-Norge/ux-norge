import { Link } from "@Components/Link";
import { Author } from "@Types";
import { Image } from "@Ui/Image";
import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

export const AuthorThumbnail: React.FC<
  Pick<Author, "name" | "image" | "slug" | "company">
> = ({ name, image, slug, company }) => {
  return (
    <Link
      path={slug.current}
      type="author"
      className="flex items-center space-x-16"
    >
      <Image image={image} alt={name} width={200} className="w-80 rounded-t" />
      <div>
        <Heading4>{name}</Heading4>
        <Body1>{company?.name}</Body1>
      </div>
    </Link>
  );
};
