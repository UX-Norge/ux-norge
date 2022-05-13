import * as React from "react";

interface VectorProps {
  className?: string;
  color: string;
}

const random6DigitNumber = (): string => {
  return Math.floor(Math.random() * 1000000).toString();
};

const MonoDoor: React.FC<VectorProps> = ({ className, color }) => {
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
        fill="#141313"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M46.4528 13.7569C48.0833 17.0525 48.9998 20.7643 48.9998 24.6902V100.002H15.7847V37.7142C15.7847 24.0801 26.8374 13.0273 40.4716 13.0273C42.5342 13.0273 44.5377 13.2803 46.4528 13.7569Z"
        fill={color}
      />
      <circle cx="22" cy="66" r="2" fill="#141313" />
    </svg>
  );
};

const ShadowDoor: React.FC<VectorProps> = ({ className, color }) => {
  const id = random6DigitNumber();
  return (
    <svg
      width="170"
      height="310"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-labelledby={id}
    >
      <title id={id}>Door Illustration</title>
      <path
        d="M0 85C0 38.056 38.056 0 85 0s85 38.056 85 85v225H0V85Z"
        fill="#7061EA"
      />
      <path
        d="M0 79.5C0 35.593 35.593 0 79.5 0S159 35.593 159 79.5V310H0V79.5Z"
        fill="#9786FF"
      />
      <path
        d="M0 85C0 38.056 38.056 0 85 0s85 38.056 85 85v225H0V85Z"
        fill="#7061EA"
      />
      <path
        d="M0 79.5C0 35.593 35.593 0 79.5 0S159 35.593 159 79.5V310H0V79.5Z"
        fill="#9786FF"
      />
    </svg>
  );
};

export const VectorIllustrations = {
  MonoDoor,
  ShadowDoor,
};
