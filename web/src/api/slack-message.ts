import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { isValidRequest } from "@sanity/webhook";
import fetch from "node-fetch";
import { publishMessage } from "../api-lib/slack";
import { sanityClient } from "../api-lib/sanity.client";

interface SlackMessageBody {
  text: string;
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const secret = process.env.WEBHOOK_SECRET as string;

  if (!isValidRequest(req, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  const channelId = process.env.SLACK_ADS_CHANNEL_ID as string;
  const adId = req.body?.id || "01ee9ecb-c973-4443-b703-eca454228712";
  const query = `*[_id == $adId && _type == "ad"] {
      title,
      location[]->{name},
      "advertiser": advertiser->name,
      description,
      "slug": slug.current
    }[0]`;
  sanityClient.fetch(query, { adId }).then((result: any) => {
    publishMessage(channelId, "Test", [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: `${result.advertiser} — ${result.location.join(" / ")}`,
        },
      },
      {
        type: "header",
        text: {
          type: "plain_text",
          text: result.title,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text: result.description,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `https://uxnorge.no/stillignsannonse/${result.slug}`,
        },
      },
    ]);
  });

  res.status(200).json({});
}
