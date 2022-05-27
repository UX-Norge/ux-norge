import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import { sanityClient } from "../api-lib/sanity.client";
import { Ad } from "@Types";
import Cors from "cors";
import { slugify } from "../lib/helpers";

const cors = Cors();

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // Run Cors middleware and handle errors.
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        reject(result);
      }
      resolve(result);
    });
  });

  const {
    title,
    description,
    advertiser,
    contactName,
    contactEmail,
    contactPhone,
    packageType,
    code,
    location,
    link,
  } = req.body;

  const doc = {
    _type: "ad",
    _id: "drafts.",
    title,
    slug: slugify(title),
    description,
    advertiser: { _type: "reference", _ref: advertiser },
    contactName,
    contactEmail,
    contactPhone,
    packageType: { _type: "reference", _ref: packageType },
    location: location.split(","),
    link,
  };

  const query = `*[_id == $companyId] {
      code
    }[0]`;

  sanityClient.fetch(query, { companyId: advertiser }).then((result: any) => {
    if (result.code === code) {
      sanityClient
        .create(doc)
        .then((result: any) => console.log(`Created ad`, result));
    }
  });

  res.status(200).json({});
}
