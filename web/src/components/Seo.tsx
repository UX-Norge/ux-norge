import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Helmet } from "react-helmet";
import { Author, Company, SanityImage, SiteSettings } from "@Types";
import { imageUrl } from "gatsby-plugin-sanity-image";
import { PageProps } from "gatsby";

interface IProps {
  title?: string;
  description?: string;
  image?: SanityImage;
  imageAlt?: string;
  location?: PageProps["location"];
  type?: "article" |"job-ad" | null;
  company?: Company;
  publishDate?: string;
  authors?: Author[];
  adExpiryDate?: Date;
  adLocationString?: string;
}

export const Seo: React.FC<IProps> = ({
  title,
  description,
  image,
  imageAlt,
  location,
  type,
  company,
  publishDate,
  authors,
  adExpiryDate,
  adLocationString
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

    
  let siteJSONLD: string = `
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "publisher": {
        "@type": "Organization",
        "name": "UX Norge",
        "url": "https://uxnorge.no/",
      }
    }
  `;

  let articleJSONLD: any;
  if (type === "article")
     articleJSONLD = `
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "title": "${title}",
        "description": "${description}",
        "image": "${imageUrl(image?.asset, { width: 1200, height: 630 })}",
        "author": {
          "@type": "Person",
          "name": "${authors?.length ? authors[0].name : ''}"
        },
      }
    `;

    let jobPostJSONLD: any;
    if (type === "job-ad") {
      let validThrough = adExpiryDate ? '"validThrough": "' + adExpiryDate.toISOString() + '"' : "";
      jobPostJSONLD = `
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "${title}",
          "description": "${description}",
          ${validThrough}
          "hiringOrganization": {
            "@type": "Organization",
            "name": "${company?.name}",
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "${adLocationString}",
            },
          }
        }
      `;
    }

  title = title || seo.title;
  description = description || seo.description;

  return (
    <Helmet
      htmlAttributes={{
        lang: "no",
      }}
      title={title}
      titleTemplate={location?.pathname === "/" ? "" : seo.titleTemplate}
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

      {siteJSONLD && (
        <script type="application/ld+json">{siteJSONLD}</script>
      )}

      {articleJSONLD && (
        <script type="application/ld+json">{articleJSONLD}</script>
      )}

      {jobPostJSONLD && (
        <script type="application/ld+json">{jobPostJSONLD}</script>
      )}

    </Helmet>
  );
};
