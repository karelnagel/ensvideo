import { Player } from "../components/Player";
import { config } from "./../config";
import { defaultScenes } from "../interfaces/VideoInput";
import { useRouter } from "next/router";
import { CustomHead } from "../components/Head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProvider } from "wagmi";

function Personal() {
  const router = useRouter();
  const { theme, scenes, name } = router.query;
  const provider = useProvider();
  const [finalScenes, setFinalScenes] = useState(defaultScenes);
  const [finalTheme, setFinalTheme] = useState(config.themes[0]);

  useEffect(() => {
    async function effect() {
      if (!name) return;
      const resolver = await provider.getResolver(name.toString());
      if (!resolver) return;
      const hash = await resolver.getText(config.textKey);
      if (!hash) return;
      const result = await axios.get(`https://ipfs.io/ipfs/${hash}`);
      console.log(result.data, hash);
      setFinalScenes(scenes ? JSON.parse(scenes.toString()) : result.data.scenes || defaultScenes);
      setFinalTheme(theme ? theme.toString() : result.data.theme || config.themes[0]);
    }
    effect();
  }, [name, provider, scenes, theme]);
  return (
    <div className="">
      <CustomHead nameIn={name?.toString()} descriptionIn={`Watch ${name?.toString()} ENS video`} />
      <div className="w-full py-24 flex justify-center">
        <h1 className="text-6xl font-bold text-primary">{name}</h1>
      </div>
      <div className="max-w-screen-lg m-auto rounded-lg overflow-hidden">
        <Player
          name={name?.toString()!}
          theme={finalTheme}
          scenes={finalScenes}
        />
      </div>
    </div>
  );
}

export default Personal;
