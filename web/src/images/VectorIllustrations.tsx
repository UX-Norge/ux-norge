import * as React from "react";

interface VectorProps {
  className?: string;
  foregroundColor: string;
  backgroundColor?: string;
}

const random6DigitNumber = (): string => {
  return Math.floor(Math.random() * 1000000).toString();
};

const MonoDoor: React.FC<VectorProps> = ({
  className,
  foregroundColor,
  backgroundColor = "var(--color-gray-900)",
}) => {
  const id = random6DigitNumber();
  return (
    <svg
      viewBox="0 0 49 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-labelledby={id}
      role="img"
    >
      <title id={id}>Door illustration</title>
      <path
        d="M0 24.5C0 10.969 10.969 0 24.5 0V0C38.031 0 49 10.969 49 24.5V100H0V24.5Z"
        fill={backgroundColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.4528 13.7569C48.0833 17.0525 48.9998 20.7643 48.9998 24.6902V100.002H15.7847V37.7142C15.7847 24.0801 26.8374 13.0273 40.4716 13.0273C42.5342 13.0273 44.5377 13.2803 46.4528 13.7569Z"
        fill={foregroundColor}
      />
      <circle cx="22" cy="66" r="2" fill={backgroundColor} />
    </svg>
  );
};

const ShadowDoor: React.FC<VectorProps> = ({
  className,
  foregroundColor,
  backgroundColor = "var(--color-primary-500)",
}) => {
  const id = random6DigitNumber();
  return (
    <svg
      width="533"
      height="310"
      viewBox="0 0 533 310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-labelledby={id}
    >
      <title id={id}>Door illustration</title>
      <path
        d="M86 181C86 134.056 124.056 96 171 96C217.944 96 256 134.056 256 181V310H86V181Z"
        fill={backgroundColor}
      />
      <path
        d="M460 183.5C460 163.342 476.342 147 496.5 147C516.658 147 533 163.342 533 183.5V310H460V183.5Z"
        fill={backgroundColor}
      />
      <path
        d="M87 175.5C87 131.593 122.593 96 166.5 96V96C210.407 96 246 131.593 246 175.5V310H87V175.5Z"
        fill={foregroundColor}
      />
      <path
        d="M460 181C460 162.222 475.222 147 494 147C512.778 147 528 162.222 528 181V310H460V181Z"
        fill={foregroundColor}
      />
      <path
        d="M460 183.5C460 163.342 476.342 147 496.5 147C516.658 147 533 163.342 533 183.5V310H460V183.5Z"
        fill={backgroundColor}
      />
      <path
        d="M-5.41674e-06 267.5C-2.42516e-06 248.446 15.4462 233 34.5 233C53.5538 233 69 248.446 69 267.5L69 310L-1.20895e-05 310L-5.41674e-06 267.5Z"
        fill={backgroundColor}
      />
      <path
        d="M268 85C268 38.0558 306.056 0 353 0V0C399.944 0 438 38.0558 438 85V310H268V85Z"
        fill={backgroundColor}
      />
      <path
        d="M268 79.5C268 35.5934 303.593 0 347.5 0V0C391.407 0 427 35.5934 427 79.5V310H268V79.5Z"
        fill={foregroundColor}
      />
      <path
        d="M460 181C460 162.222 475.222 147 494 147V147C512.778 147 528 162.222 528 181V310H460V181Z"
        fill={foregroundColor}
      />
      <path
        d="M-5.10273e-06 265.5C-2.28457e-06 247.551 14.5507 233 32.5 233V233C50.4493 233 65 247.551 65 265.5L65 310L-1.20895e-05 310L-5.10273e-06 265.5Z"
        fill={foregroundColor}
      />
    </svg>
  );
};

export const VectorIllustrations = {
  MonoDoor,
  ShadowDoor,
};
