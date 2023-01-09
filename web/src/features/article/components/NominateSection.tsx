import { Category } from "@Types";
import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

interface NominateSectionProps {
  category: Category;
}

const UKENS_DESIGNER_CATEGORY_ID = "4f8fdbac-743d-48d3-aeb4-e332e9b3e2df";

export const NominateSection: React.FC<NominateSectionProps> = ({
  category,
}) => {
  if (category._id !== UKENS_DESIGNER_CATEGORY_ID) return null;
  return (
    <div className="my-24">
      <Heading4>Nominer ukens designer</Heading4>
      <Body1>
        Vil du nominere noen til ukens designer? Send en PM til{" "}
        <a
          className="link"
          href="https://uxnorge.slack.com/archives/D02HJFDGAV6"
        >
          @tone
        </a>{" "}
        på UX Norge, eller send en mail til{" "}
        <a className="link" href="mailto:hei@uxnorge.no">
          hei@uxnorge.no
        </a>
        .
      </Body1>
    </div>
  );
};
