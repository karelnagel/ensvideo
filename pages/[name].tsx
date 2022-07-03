import { Player } from "../components/Player";
import { CustomHead } from "../components/Head";
import { useProps } from "../hooks/useProps";
import Link from "next/link";
import { getUrl } from "../functions/getUrl";

function Personal() {
  const { scenes, theme, music, name } = useProps();

  return (
    <div className="">
      <CustomHead nameIn={name?.toString()} descriptionIn={`Watch ${name?.toString()} ENS video`} />
      <div className="w-full py-24 flex justify-center">
        <h1 className="text-6xl font-bold text-primary">{name}</h1>
      </div>
      <div className="max-w-screen-lg m-auto rounded-lg overflow-hidden">
        {scenes && theme && music ? <Player name={name?.toString()!} theme={theme} scenes={scenes} music={music} /> : <div>Loading...</div>}
      </div>
      <Link href={getUrl({ theme, scenes, music })}>
        <button className="btn btn-secondary">Use as template</button>
      </Link>
    </div>
  );
}

export default Personal;
