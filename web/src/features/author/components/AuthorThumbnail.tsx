import { Link } from "@Components/Link";
import { Author } from "@Types";
import { Door } from "@Ui/Door";
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
      className="group grid grid-cols-[80px_1fr] items-center space-x-16"
    >
      <Door image={image} alt={name} width={80} height={80} />
      <div>
        <Heading4>{name}</Heading4>
        <Body1>{company?.name}</Body1>
      </div>
    </Link>
  );
};
