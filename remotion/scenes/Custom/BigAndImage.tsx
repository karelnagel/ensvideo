import { AbsoluteFill, Img } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function BigAndImage({ props, input }: SceneInput) {
  const big = props[0] || "Your text here";
  const image = props[1] || "/ens.svg";

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <Img src={image} className="w-96 h-96 rounded-md mask mask-squircle" />
      <h1 className="text-9xl text-primary">{big}</h1>
    </AbsoluteFill>
  );
}
