import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function WithEmail({ props, input }: SceneInput) {
  const title = props[0] || "Contact me";
  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 className="text-9xl text-primary">{title}</h1>
      <h3 className="">{input.email}</h3>
    </AbsoluteFill>
  );
}
