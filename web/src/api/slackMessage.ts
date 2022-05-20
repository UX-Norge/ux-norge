import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

interface SlackMessageBody {
  text: string;
}

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(req.body);

  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        text: "Test!",
      },
    }
  );
  res.status(200).json({ hello: `world` });
}
