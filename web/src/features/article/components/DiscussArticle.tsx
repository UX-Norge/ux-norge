import { PortableText } from "@Types";
import { Button } from "@Ui/Button";
import { BlockContent, Heading4 } from "@Ui/Typography";
import * as React from "react";

interface DiscussArticleProps {
  slackMessageLink?: string;
  title: string;
  text: PortableText;
}

export const DiscussArticle: React.FC<DiscussArticleProps> = ({
  slackMessageLink,
  title,
  text,
}) => {
  if (!title || !text) return null;
  return (
    <div className="space-y-8">
      <Heading4>{title}</Heading4>
      <div className="[&_a]:link [&_p]:text-base">
        <BlockContent blocks={text} />
      </div>
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
