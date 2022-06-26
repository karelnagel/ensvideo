import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function Waving({ props, input }: SceneInput) {
  const title = props[0] || "Hi, I'm";
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring2 = spring({ frame, fps, from: -100, to: 0 });
  const wave = interpolate(frame, [0, fps, fps * 2, fps * 3], [0, 1, 0, 1]);

  return (
    <AbsoluteFill className="flex justify-center items-center">
      <h1 style={{ transform: `translateX(${spring2}%)` }} className="text-primary text-9xl">
        {title} {input.name}
        <span style={{ transform: `rotate(${Math.sin(wave / 6)}turn)`, display: "inline-block" }}>👋</span>
      </h1>
    </AbsoluteFill>
  );
}
