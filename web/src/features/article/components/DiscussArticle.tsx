import { Button } from "@Ui/Button";
import { BlockContent, Body1, Heading4 } from "@Ui/Typography";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";

interface DiscussArticleProps {
  slackMessageLink?: string;
}

export const DiscussArticle: React.FC<DiscussArticleProps> = ({
  slackMessageLink,
}) => {
  const {
    sanityDiscussInSlack: { title, text },
  } = useStaticQuery(graphql`
    query {
      sanityDiscussInSlack(_id: { eq: "discussInSlack" }) {
        title
        text: _rawText
      }
    }
  `);
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
