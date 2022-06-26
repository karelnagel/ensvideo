import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function Big({ props, input }: SceneInput) {
  const title = props[0] || "Your text here";
  
  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h1 className="text-9xl text-primary">{title}</h1>
    </AbsoluteFill>
  );
}
