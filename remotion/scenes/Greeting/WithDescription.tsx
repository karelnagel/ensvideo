import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function WithDescription({ props, input }: SceneInput) {
  const title = props[0] || "Hi, I'm";
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring2 = spring({ frame, fps, from: -100, to: 0 });
  const opacity = interpolate(frame, [fps, fps * 2], [0, 1]);

  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h1 style={{ transform: `translateX(${spring2}%)` }} className="text-9xl text-primary">
        {title} {input.name}
      </h1>
      <h3 style={{ opacity }} className="">
        {input.description}
      </h3>
    </AbsoluteFill>
  );
}
