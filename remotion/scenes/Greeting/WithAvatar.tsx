import { AbsoluteFill, Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneInput } from "../../../interfaces/VideoInput";

export function WithAvatar({ props, input }: SceneInput) {
  const title = props[0] || "Hi, I'm";
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring2 = spring({ frame, fps, from: -100, to: 0 });
  const spring3 = spring({ frame, fps, from: 0, to: 1 });

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-20">
      <div className="mask mask-squircle bg-secondary h-80 w-80 p-4" style={{ transform: `scale(${spring3})` }}>
        <Img src={input.avatar} className="mask mask-squircle  h-full w-full" />
      </div>
      <h1 style={{ transform: `translateX(${spring2}%)` }} className="text-9xl text-primary">
        {title} {input.name}
      </h1>
    </AbsoluteFill>
  );
}
