import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";
import { useText } from "../../hooks/usetText";

export function WithEmail({ props, input }: SceneInput) {
  const [title] = useText(props, input, ["Contact me"]);
  
  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 className="text-9xl text-primary">{title}</h1>
      <h3 className="">{input.email}</h3>
    </AbsoluteFill>
  );
}
