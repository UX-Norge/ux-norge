import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { isValidRequest } from "@sanity/webhook";
import fetch from "node-fetch";
import { publishMessage } from "../api-lib/slack";

interface SlackMessageBody {
  text: string;
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const secret = process.env.WEBHOOK_SECRET as string;
  const slackWebhook = process.env.SLACK_WEBHOOK as string;

  if (!isValidRequest(req, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  const { title, description, link } = {
    title: "Senior UX-designer",
    description:
      "Gjør det mest meningsfulle designarbeidet i din karriere. Bli med å lage plattformen som skaper morgendagens velferdssamfunn.",
    link: "https://uxnorge.no/stillignsannonse/senior-ux-designer3/",
  };

  console.log(req.body);

  const channelId = process.env.SLACK_ADS_CHANNEL_ID as string;
  publishMessage(channelId, "Test", [
    {
      type: "section",
      text: {
        type: "plain_text",
        text: "[Umble — Oslo / Remote]",
        emoji: true,
      },
    },
    {
      type: "header",
      text: {
        type: "plain_text",
        text: title,
        emoji: true,
      },
    },
    {
      type: "section",
      text: {
        type: "plain_text",
        text: description,
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: link,
      },
    },
  ]);
  res.status(200).json({});
}
