import { Button } from "@Ui/Button";
import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

interface DiscussArticleProps {
  invitationLink: string;
  slackMessageLink?: string;
}

export const DiscussArticle: React.FC<DiscussArticleProps> = ({
  invitationLink,
  slackMessageLink,
}) => {
  return (
    <div className="my-24 space-y-8">
      <Heading4>Diskuter artikkelen i UX Norge Slacken</Heading4>
      <Body1>
        Mangler du konto?{" "}
        <a className="link" href={invitationLink}>
          Bli med i Slacken
        </a>
      </Body1>
      <Button
        href={
          slackMessageLink || "https://uxnorge.slack.com/archives/C7RP430UD"
        }
      >
        {slackMessageLink ? "Gå til artikkelen" : "Gå til #artikler i Slack"}
      </Button>
    </div>
  );
};
