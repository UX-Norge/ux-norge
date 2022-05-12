import * as React from "react";
import { Body1, Overline } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import { Footer as FooterProps, GraphqlEdges, SocialMedia } from "@Types";
import { Link } from "@Components/Link";
import { cleanGraphqlArray } from "@Lib/helpers";
import { Image } from "@Ui/Image";
import { Newsletter } from "@Components/Newsletter";
import { MainSponsors } from "@Features/ad/components/MainSponsors";

import logo from "@Images/logo-white.svg";

interface LinkListProps {
  title: string;
  links: FooterProps["pages"] | FooterProps["resources"];
}

export const Footer: React.FC = () => {
  const { sanityFooter, allSanitySocialMedia } = useStaticQuery<{
    sanityFooter: FooterProps;
    allSanitySocialMedia: GraphqlEdges;
  }>(graphql`
    query {
      sanityFooter(_id: { eq: "footer" }) {
        contactInformation
        pages {
          name
          url
        }
        resources {
          name
          url
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
      {links.map((link, index) => (
        <Link
          type="page"
          path={link.url || ""}
          className="block text-primary-100"
          key={`page-${index}`}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <MainSponsors />
      <Newsletter />
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-page space-y-96 p-32">
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
          <div className="flex justify-center space-x-24">
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
        <Overline className="flex w-full justify-center bg-gray-800 p-8 text-white">
          <a href="https://umble.no">Laget av Umble</a>
        </Overline>
      </footer>
    </>
  );
};
