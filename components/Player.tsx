import { Player as RemotionPlayer } from "@remotion/player";
import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { config, network } from "../config";
import { useEnsQuery } from "../graphql/generated";
import { Music, Scene, VideoInput } from "../interfaces/VideoInput";
import { Video } from "../remotion/Video";

export function Player({ name, theme, scenes, music }: { name: string; theme: string; scenes: Scene[]; music: Music }) {
  const { data } = useEnsQuery({ variables: { name } });
  const provider = useProvider({ chainId: network.chain.id });
  const [videoProps, setVideoProps] = useState<VideoInput>({ name, theme, scenes, music });
  const duration = scenes.reduce((acc, scene) => acc + scene.duration, 0);

  useEffect(() => {
    const effect = async () => {
      if (!name) return;
      const resolver = await provider.getResolver(name);
      if (!resolver) return;

      setVideoProps((v) => ({ ...v, isReady: false }));
      const texts = data?.domains[0].resolver?.texts;

      const text = async (key: string) => (texts?.includes(key) ? await resolver.getText(key) : "");
      const avatar = await resolver.getAvatar();
      const email = await text("email");
      const url = await text("url");
      const description = await text("description");
      const twitter = await text("com.twitter");
      const github = await text("com.github");
      const discord = await text("com.discord");

      const address = data?.domains ? data.domains[0].owner.id : "";
      const subdomains: string[] = data?.domains ? (data.domains[0].subdomains.filter((s) => s.name).map((s) => s.name) as string[]) : [];
      const birthday = Number(data?.domains ? data.domains[0].createdAt : "0");

      setVideoProps((v) => ({
        ...v,
        avatar: avatar?.url,
        email,
        url,
        description,
        twitter,
        github,
        discord,
        isReady: true,
        address,
        birthday,
        subdomains,
      }));
    };
    effect();
  }, [provider, data, name]);

  useEffect(() => setVideoProps((v) => ({ ...v, name, theme, scenes, music })), [name, theme, scenes, music]);

  return (
    <div>
      {videoProps.isReady && (
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
      {!videoProps.isReady && <div>Loading...</div>}
    </div>
  );
}
