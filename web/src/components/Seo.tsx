import { Author, SanityImage, SiteSettings } from "@Types";
import { graphql, PageProps, useStaticQuery } from "gatsby";
import { imageUrl } from "gatsby-plugin-sanity-image";
import * as React from "react";
import { Helmet } from "react-helmet";

/**
 * Tools for SEO:
 * - https://webcode.tools/generators — Generate JSON-LD, Open Graph, Twitter Card, etc.
 * - https://chrome.google.com/webstore/detail/json-ld-tester/aohmciehgjboidolkmoaofcbnejmokan — Chrome extension for testing, can be used in localhost
 */

interface IProps {
  title?: string;
  description?: string;
  image?: SanityImage;
  imageAlt?: string;
  location: PageProps["location"];
  type?: "article" | null;
  publishDate?: string;
  authors?: Author[];
}

export const Seo: React.FC<IProps> = ({
  title,
  description,
  image,
  imageAlt,
  location,
  type,
  publishDate,
  authors,
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

  let siteJSONLD: any = {
    "@context": "http://schema.org/",
    "@type": "WebSite",
    url: "https://uxnorge.no/",
    name: "UX Norge",
  };

  if (type === "article")
    siteJSONLD = {
      "@context": "http://schema.org/",
      "@type": "Article",
      name: "UX Norge",
      url: location.href,
      headline: title,
      datePublished: publishDate,
      author: authors?.map((author) => ({
        "@type": "Person",
        name: author.name,
        worksFor: {
          "@type": "Organization",
          name: author.company?.name,
        },
      })),
    };

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
          content={imageUrl(image?.asset, { width: 1200, height: 630 })}
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
      {type === "article" &&
        authors?.map((author) => (
          <meta
            key={author._id}
            property="article:author"
            content={author.name}
          />
        ))}
      {type === "article" && publishDate && (
        <meta property="article:published_time" content={publishDate} />
      )}

      <script type="application/ld+json">{JSON.stringify(siteJSONLD)}</script>
    </Helmet>
  );
};
