import { AbsoluteFill, Img } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { useText } from "../../hooks/usetText";

export function BigAndImage({ props, userInfo }: SceneInput) {
  const [big, image] = useText(props, userInfo, ["Your text here", "/ens.svg"]);

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <Img src={image} className="w-96 h-96 rounded-md mask mask-squircle" />
      <h1 className="text-9xl text-primary">{big}</h1>
    </AbsoluteFill>
  );
}
