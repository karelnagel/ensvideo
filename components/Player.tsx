import { Player as RemotionPlayer } from "@remotion/player";
import { useEffect, useState } from "react";
import { config } from "../config";
import { useUserInfo } from "../hooks/useUserInfo";
import { Music } from "../idk/music";
import { Scene } from "../idk/scene";
import { VideoInput } from "../idk/VideoInput";
import { Video } from "../remotion/Video";

export function Player({ name, theme, scenes, music }: { name: string; theme: string; scenes: Scene[]; music: Music }) {
  const [videoProps, setVideoProps] = useState<VideoInput>({ name, theme, scenes, music });
  const userInfo = useUserInfo(name);

  const duration = scenes.reduce((acc, scene) => acc + scene.duration, 0);

  useEffect(() => setVideoProps((v) => ({ ...v, userInfo })), [userInfo]);
  useEffect(() => setVideoProps((v) => ({ ...v, theme })), [theme]);
  useEffect(() => setVideoProps((v) => ({ ...v, scenes })), [scenes]);
  useEffect(() => setVideoProps((v) => ({ ...v, music })), [music]);

  return (
    <div>
      {videoProps.userInfo && (
        <RemotionPlayer
          component={Video}
          durationInFrames={config.remotion.fps * (duration > 0 ? Math.round(duration) : 1)}
          compositionWidth={config.remotion.width}
          compositionHeight={config.remotion.height}
          fps={config.remotion.fps}
          inputProps={videoProps}
          style={{
            width: "100%",
          }}
          clickToPlay
          controls
          autoPlay
          loop
        />
      )}
      {!videoProps.userInfo && <div>Loading...</div>}
    </div>
  );
}
