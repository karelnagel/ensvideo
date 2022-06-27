import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { useText } from "../../hooks/usetText";

export function WithDescription({ props, userInfo }: SceneInput) {
  const [title, description] = useText(props, userInfo, ["Hi, I'm {name}", "{description}"]);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring2 = spring({ frame, fps, from: -100, to: 0 });
  const opacity = interpolate(frame, [fps, fps * 2], [0, 1]);

  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h1 style={{ transform: `translateX(${spring2}%)` }} className="text-9xl text-primary">
        {title}
      </h1>
      <h3 style={{ opacity }} className="">
        {description}
      </h3>
    </AbsoluteFill>
  );
}
