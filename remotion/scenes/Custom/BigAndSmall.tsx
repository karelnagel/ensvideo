import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { useText } from "../../hooks/usetText";

export function BigAndSmall({ props, userInfo }: SceneInput) {
  const [big, small] = useText(props, userInfo, ["Your text here", "Your smaller text here"]);

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 className="text-9xl text-primary">{big}</h1>
      <h3 className="">{small}</h3>
    </AbsoluteFill>
  );
}
