import { Player } from "../components/Player";
import { config } from "./../config";
import { defaultScenes } from "../interfaces/VideoInput";
import { useRouter } from "next/router";

function Personal() {
  const router = useRouter();
  const { theme, scenes, name } = router.query;

  return (
    <div className="">
      <div className="w-full py-24 flex justify-center">
        <h1 className="text-6xl font-bold text-primary">{name}</h1>
      </div>
      <div className="max-w-screen-lg m-auto rounded-lg overflow-hidden">
        <Player
          name={name?.toString()!}
          theme={theme?.toString() || config.themes[0]}
          scenes={scenes ? JSON.parse(scenes.toString()) : defaultScenes}
        />
      </div>
    </div>
  );
}

export default Personal;
