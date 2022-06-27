import { Player } from "../components/Player";
import { config } from "./../config";
import { defaultMusic, defaultScenes, Music, Scene } from "../interfaces/VideoInput";
import { useRouter } from "next/router";
import { CustomHead } from "../components/Head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProvider } from "wagmi";

function Personal() {
  const router = useRouter();
  const { theme, scenes, name, music } = router.query;
  const provider = useProvider();
  const [finalScenes, setFinalScenes] = useState<Scene[] | null>(null);
  const [finalTheme, setFinalTheme] = useState<string | null>(null);
  const [finalMusic, setFinalMusic] = useState<Music | null>(null);

  useEffect(() => {
    async function effect() {
      if (!name) return;
      const resolver = await provider.getResolver(name.toString());
      if (!resolver) return;

      let currentScenes = scenes ? JSON.parse(scenes.toString()) : null;
      let currentMusic = music ? JSON.parse(music.toString()) : null;
      let currentTheme = theme ? theme.toString() : null;

      const hash = await resolver.getText(config.textKey);
      if (hash) {
        const result = await axios.get(`https://ipfs.io/ipfs/${hash}`);
        console.log(result.data, hash);
        if (!currentScenes) currentScenes = result.data.scenes;
        if (!currentMusic) currentMusic = result.data.music;
        if (!currentTheme) currentTheme = result.data.theme;
      }
      setFinalScenes(currentScenes || defaultScenes);
      setFinalMusic(currentMusic || defaultMusic);
      setFinalTheme(currentTheme || config.themes[0]);
    }
    effect();
  }, [name, provider, scenes, theme, music]);
  return (
    <div className="">
      <CustomHead nameIn={name?.toString()} descriptionIn={`Watch ${name?.toString()} ENS video`} />
      <div className="w-full py-24 flex justify-center">
        <h1 className="text-6xl font-bold text-primary">{name}</h1>
      </div>
      <div className="max-w-screen-lg m-auto rounded-lg overflow-hidden">
        {finalScenes && finalTheme && finalMusic ? (
          <Player name={name?.toString()!} theme={finalTheme} scenes={finalScenes} music={finalMusic} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Personal;
