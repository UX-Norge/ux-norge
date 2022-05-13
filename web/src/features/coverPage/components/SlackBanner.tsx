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
      }
    }
  `);
  if (!sanitySlackBanner) return null;
  const { title, text, buttonText } = sanitySlackBanner;
  return (
    <div className="bg-yellow-100 px-48 pt-8">
      <div className="mx-auto flex w-full max-w-page items-center justify-between">
        <div className="flex items-center space-x-24">
          <VectorIllustrations.MonoDoor
            foregroundColor="var(--color-yellow-200)"
            className="w-48"
          />
          <div>
            <Heading4>{title}</Heading4>
            <Body1>{text}</Body1>
          </div>
        </div>
        <Button href="https://uxnorge.slack.com/join/shared_invite/zt-n4kqavud-8ZYV08oyR7WuVukZkSR69Q#/shared-invite/email">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
