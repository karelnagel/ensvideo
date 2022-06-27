import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { useText } from "../../hooks/usetText";

export function WithEmail({ props, userInfo }: SceneInput) {
  const [title] = useText(props, userInfo, ["Contact me"]);

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 className="text-9xl text-primary">{title}</h1>
      <h3 className="">{userInfo.email}</h3>
    </AbsoluteFill>
  );
}
