import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

interface SlackMessageBody {
  text: string;
}

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  console.log(req.body);

  res.status(200).json({ hello: `world` });
}
