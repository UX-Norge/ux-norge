import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { SanityImage, SiteSettings } from "@Types";
import { imageUrl } from "gatsby-plugin-sanity-image";
import { PageProps } from "gatsby";

interface IProps {
  title?: string;
  description?: string;
  image?: SanityImage;
  imageAlt?: string;
  location: PageProps["location"];
  type?: "article" | null;
}

export const Seo: React.FC<IProps> = ({
  title,
  description,
  image,
  imageAlt,
  location,
  type,
}) => {
  const { sanitySiteSettings: seo } = useStaticQuery<{
    sanitySiteSettings: SiteSettings;
  }>(graphql`
    query {
      sanitySiteSettings {
        title
        description
        titleTemplate
      }
    }
  `);

  title = title || seo.title;
  description = description || seo.description;

  return (
    <Helmet
      htmlAttributes={{
        lang: "no",
      }}
      title={title}
      titleTemplate={location.pathname === "/" ? "" : seo.titleTemplate}
    >
      {title && <meta property="og:title" content={title} />}
      {title && <meta property="twitter:title" content={title} />}

      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}

      {image && (
        <meta
          property="og:image"
          content={imageUrl(image?.asset, { width: 1200, height: 627 })}
        />
      )}
      {image && (
        <meta
          name="twitter:image"
          content={imageUrl(image?.asset, { width: 800, height: 418 })}
        />
      )}
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
      <meta name="twitter:card" content="summary" />

      {location && <meta property="og:url" content={location.href} />}
      {type === "article" && <meta property="og:type" content="article" />}
    </Helmet>
  );
};
