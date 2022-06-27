import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";
import { useText } from "../../hooks/usetText";

export function WithBirthday({ props, input }: SceneInput) {
  const [title, since] = useText(props, input, ["Hi, I'm {name}", "since {birthday}"]);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring2 = spring({ frame, fps, from: -100, to: 0 });
  const opacity = interpolate(frame, [fps, fps * 2], [0, 1]);

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 style={{ transform: `translateX(${spring2}%)` }} className="text-9xl text-primary">
        {title}
      </h1>
      <h3 style={{ opacity }} className="">
        {since}
      </h3>
    </AbsoluteFill>
  );
}
