import { VectorIllustrations } from "@Images/VectorIllustrations";
import { Button } from "@Ui/Button";
import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

interface IProps {}

export const SlackBanner: React.FC<IProps> = ({}) => {
  return (
    <div className="bg-yellow-100 px-48 pt-8">
      <div className="mx-auto flex w-full max-w-page items-center justify-between">
        <div className="flex items-center space-x-24">
          <VectorIllustrations.MonoDoor
            color="var(--color-yellow-200)"
            className="w-48"
          />
          <div>
            <Heading4>Bli med 3071 medlemmer i UX Norge-slacken</Heading4>
            <Body1>Diskuter alt fra Norman doors til innsiktsmetoder</Body1>
          </div>
        </div>
        <Button href="https://uxnorge.slack.com/join/shared_invite/zt-n4kqavud-8ZYV08oyR7WuVukZkSR69Q#/shared-invite/email">
          Bli med
        </Button>
      </div>
    </div>
  );
};
