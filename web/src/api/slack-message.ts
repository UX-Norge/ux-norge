import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { publishMessage } from "../api-lib/slack";
import { sanityClient } from "../api-lib/sanity.client";
import { readBody } from "../api-lib/readBody";

const secret = process.env.WEBHOOK_SECRET as string;

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log('Starter webhook for slack-message')
  const signature = req.headers.secret as string;
  
  if (!(secret === signature)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  const channelId = process.env.SLACK_ADS_CHANNEL_ID as string;
  const adId = req.body?._id;
  const onSlack = req.body?.onSlack;

  if (!onSlack) return;

  const query = `*[_id == $adId && _type == "ad"] {
      title,
      location[]->{name},
      "advertiser": advertiser->name,
      description,
      "slug": slug.current
    }[0]`;

  sanityClient
    .fetch(query, { adId })
    .then((result: any) => {
        console.log(adId, result);
      if (!result) {
        res.send(404);
        return null;
      }
      const blocks = [
        {
          type: "divider",
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
            text: `[${result.advertiser} — ${result.location
              .map((loc: any) => loc.name)
              .join(" / ")}]`,
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
          type: "section",
          text: {
            type: "mrkdwn",
            text: `https://uxnorge.no/stillingsannonse/${result.slug}`,
          },
        },
        {
          type: "divider",
        },
      ];
      return publishMessage(channelId, result.title, blocks, Math.ceil(Date.now() / 1000) + 120);
    })
    .then((response: any) => {
      console.log('Slack-promise oppfylt', response);
      if (response && response.ok) {
        res.status(200).json(response);
      } else {
        res.status(500).json(response)
      }
    })
    .catch((err: any) => res.status(500).json(err));
}
