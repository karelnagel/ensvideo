import { AbsoluteFill, Img, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { useText } from "../../hooks/usetText";

export function WithAvatar({ props, userInfo }: SceneInput) {
  const [title] = useText(props, userInfo, ["Hi, I'm {name}"]);

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring2 = spring({ frame, fps, from: -100, to: 0 });
  const spring3 = spring({ frame, fps, from: 0, to: 1 });

  return (
    <AbsoluteFill className="flex justify-center items-center space-y-20">
      <div className="mask mask-squircle bg-secondary h-80 w-80 p-4" style={{ transform: `scale(${spring3})` }}>
        <Img src={userInfo.avatar} className="mask mask-squircle  h-full w-full" />
      </div>
      <h1 style={{ transform: `translateX(${spring2}%)` }} className="text-9xl text-primary">
        {title}
      </h1>
    </AbsoluteFill>
  );
}
