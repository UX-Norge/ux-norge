import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { isValidRequest } from "@sanity/webhook";
import fetch from "node-fetch";

interface SlackMessageBody {
  text: string;
}

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const secret = process.env.WEBHOOK_SECRET as string;
  const slackWebhook = process.env.SLACK_WEBHOOK as string;

  if (!isValidRequest(req, secret)) {
    res.status(401).json({ success: false, message: "Invalid signature" });
    return;
  }

  fetch(slackWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      text: "Test!",
    },
  });
  res.status(200).json({ hello: `world` });
}
