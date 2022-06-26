import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function BigAndSmall({ props, input }: SceneInput) {
  const big = props[0] || "Your text here";
  const small = props[1] || "Your text here";
  
  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 className="text-9xl text-primary">{big}</h1>
      <h3 className="">{small}</h3>
    </AbsoluteFill>
  );
}
