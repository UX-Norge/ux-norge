import { VectorIllustrations } from "@Images/VectorIllustrations";
import { SlackBanner as SlackBannerType } from "@Types";
import { Button } from "@Ui/Button";
import { Body1, Heading4 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

export const SlackBanner: React.FC = () => {
  const { sanitySlackBanner } = useStaticQuery<{
    sanitySlackBanner: SlackBannerType;
  }>(graphql`
    query {
      sanitySlackBanner(_id: { eq: "slackBanner" }) {
        title
        text
        buttonText
        invitationLink
      }
    }
  `);
  if (!sanitySlackBanner) return null;
  const { title, text, buttonText, invitationLink } = sanitySlackBanner;
  return (
    <div className="bg-yellow-100 px-48 pt-8 pb-8 md:pb-0">
      <div className="mx-auto w-full max-w-page items-center justify-between md:flex">
        <div className="items-center md:flex md:space-x-24">
          <VectorIllustrations.MonoDoor
            foregroundColor="var(--color-yellow-200)"
            className="hidden w-48 md:block"
          />
          <div>
            <Heading4>{title}</Heading4>
            <Body1>{text}</Body1>
          </div>
        </div>
        <Button href={invitationLink}>{buttonText}</Button>
      </div>
    </div>
  );
};
