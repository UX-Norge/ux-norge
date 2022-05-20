import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import fetch from "node-fetch";

interface SlackMessageBody {
  text: string;
}

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(req.body);
  const slackWebhook = process.env.SLACK_WEBHOOK as string;

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
