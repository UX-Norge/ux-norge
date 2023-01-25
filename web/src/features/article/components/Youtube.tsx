import * as React from "react";
import getYouTubeID from "get-youtube-id";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface IProps {
  url: string;
  title: string;
}

export const Youtube: React.FC<IProps> = ({ url, title }) => {
  if (!url) return null;

  return (
    <div className="-mx-24">
      <LiteYouTubeEmbed
        title={title || "Video"}
        id={getYouTubeID(url) as string}
      />
    </div>
  );
};
