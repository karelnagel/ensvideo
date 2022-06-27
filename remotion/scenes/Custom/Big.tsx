import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { useText } from "../../hooks/usetText";

export function Big({ props, userInfo }: SceneInput) {
  const [title] = useText(props, userInfo, ["Your text here"]);
  
  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h1 className="text-9xl text-primary">{title}</h1>
    </AbsoluteFill>
  );
}
