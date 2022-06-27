import { Series, useVideoConfig, Audio } from "remotion";
import { availableMusic, availableScenes, VideoInput } from "../interfaces/VideoInput";

export const Video = (props: VideoInput) => {
  const { fps } = useVideoConfig();
  return (
    <div data-theme={props.theme} className="h-full w-full bg-base-200 text-base-content text-7xl font-bold">
      <Series>
        {props.scenes.map((scene, index) => {
          const Element = availableScenes.find((s) => s.name === scene.name)?.types.find((s, i) => i === scene.type)?.element;
          if (!Element) return null;
          return (
            <Series.Sequence key={index} durationInFrames={Math.round(fps * (scene.duration > 0 ? scene.duration : 1))}>
              <Element props={scene.props} input={props} />
            </Series.Sequence>
          );
        })}
      </Series>
      {props.music.id !== 0 && <Audio src={`/music/${availableMusic[props.music.id].file}`} startFrom={Math.round(props.music.starting * fps)} />}
    </div>
  );
};
