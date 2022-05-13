import * as React from "react";
import { Body1, Overline } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import {
  Document,
  Footer as FooterData,
  GraphqlEdges,
  Cta,
  SocialMedia,
} from "@Types";
import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Image } from "@Ui/Image";
import { Newsletter } from "@Components/Newsletter";
import { Partners } from "@Features/ad/components/Partners";

import logo from "@Images/logo-white.svg";

interface LinkListProps {
  title: string;
  links: (Cta | Document)[];
}

export interface FooterProps {
  showPartners?: boolean;
  showNewsletter?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  showPartners = true,
  showNewsletter = true,
}) => {
  const { sanityFooter, allSanitySocialMedia } = useStaticQuery<{
    sanityFooter: FooterData;
    allSanitySocialMedia: GraphqlEdges;
  }>(graphql`
    query {
      sanityFooter(_id: { eq: "footer" }) {
        contactInformation
        pages {
          ... on SanityDoc {
            title
            slug {
              current
            }
          }
          ... on SanityCta {
            _type
            url
            text
          }
        }
        resources {
          ... on SanityDoc {
            title
            slug {
              current
            }
          }
          ... on SanityCta {
            _type
            url
            text
          }
        }
      }
      allSanitySocialMedia {
        edges {
          node {
            name
            link
            image {
              ...Image
            }
          }
        }
      }
    }
  `);

  const socialMedia = cleanGraphqlArray(allSanitySocialMedia) as SocialMedia[];

  const LinkList: React.FC<LinkListProps> = ({ title, links }) => (
    <div className="space-y-24">
      <Overline className="text-primary-400">{title}</Overline>
      {links.map((link, index) => {
        let path, text;
        if (link._type === "cta") {
          link = link as Cta;
          path = link.url;
          text = link.text;
        } else {
          link = link as Document;
          path = link.slug.current;
          text = link.title;
        }

        if (!path) return null;
        return (
          <Link
            type={
              link._type === "cta" && path.includes("http")
                ? "external"
                : "page"
            }
            path={path}
            className="block text-primary-100"
            key={`page-${index}`}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );

  console.log(sanityFooter.pages);

  return (
    <>
      {showNewsletter && <Newsletter />}
      {showPartners && <Partners />}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-page space-y-96 p-32 md:grid md:grid-cols-2 md:space-y-0">
          <div>
            <Overline className="text-primary-400">Kontaktinfo</Overline>
            {sanityFooter.contactInformation.map((contact, index) => (
              <Body1 className="text-primary-100" key={`contact-${index}`}>
                {contact}
              </Body1>
            ))}
          </div>
          <div className="grid grid-cols-2">
            <LinkList title="Sider" links={sanityFooter.pages} />
            <LinkList title="Ressurser" links={sanityFooter.resources} />
          </div>
          <div className="flex justify-center space-x-24 md:justify-start">
            {socialMedia.map(({ name, link, image }, index) => (
              <a href={link} className="" key={`social-${index}`}>
                <Image
                  width={64}
                  image={image}
                  title={name}
                  alt={name}
                  className="h-24 w-24"
                />
              </a>
            ))}
          </div>
        </div>
        <Overline className="flex w-full justify-center bg-gray-800 p-8 text-gray-300">
          <a href="https://umble.no">Design og kode av Umble</a>
        </Overline>
      </footer>
    </>
  );
};
