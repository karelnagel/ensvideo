import React from "react";
import { Composition } from "remotion";
import { Video } from "./Video";
import "./../styles/index.css";
import { config } from "../config";
import { defaultScenes } from "../idk/scene";
import { defaultMusic } from "../idk/music";

export const Root: React.FC = () => {
  const duration = defaultScenes.reduce((acc, scene) => acc + scene.duration, 0);
  return (
    <>
      <Composition
        id="Video"
        component={Video}
        durationInFrames={config.remotion.fps * duration}
        fps={config.remotion.fps}
        width={config.remotion.width}
        height={config.remotion.height}
        defaultProps={{
          name:"karel.eth",
          theme: config.themes[0],
          scenes: defaultScenes,
          music: defaultMusic,
        }}
      />
    </>
  );
};
