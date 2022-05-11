import { Body1, Heading4 } from "@Ui/Typography";
import * as React from "react";

interface IProps {}

export const SlackBanner: React.FC<IProps> = ({}) => {
  return (
    <div className="bg-yellow-100 px-48 pt-8">
      <div className="mx-auto flex w-full max-w-page items-center justify-between">
        <div className="flex items-center space-x-24">
          <svg
            width="49"
            height="101"
            viewBox="0 0 49 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 24.5C0 10.969 10.969 0 24.5 0V0C38.031 0 49 10.969 49 24.5V100H0V24.5Z"
              fill="#141313"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M46.4528 13.7569C48.0833 17.0525 48.9998 20.7643 48.9998 24.6902V100.002H15.7847V37.7142C15.7847 24.0801 26.8374 13.0273 40.4716 13.0273C42.5342 13.0273 44.5377 13.2803 46.4528 13.7569Z"
              fill="#F1C048"
            />
            <circle cx="22" cy="66" r="2" fill="#141313" />
          </svg>

          <div>
            <Heading4>Bli med 3071 medlemmer i UX Norge-slacken</Heading4>
            <Body1>Diskuter alt fra Norman doors til innsiktsmetoder</Body1>
          </div>
        </div>
        <a
          href="https://uxnorge.slack.com/join/shared_invite/zt-n4kqavud-8ZYV08oyR7WuVukZkSR69Q#/shared-invite/email"
          className="rounded bg-gray-900 px-16 py-4 text-gray-0"
        >
          Bli med
        </a>
      </div>
    </div>
  );
};
