import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";
import { useText } from "../../hooks/usetText";

export function Big({ props, input }: SceneInput) {
  const [title] = useText(props, input, ["Your text here"]);
  
  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h1 className="text-9xl text-primary">{title}</h1>
    </AbsoluteFill>
  );
}
