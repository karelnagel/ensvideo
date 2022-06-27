import { Series, useVideoConfig, Audio } from "remotion";
import { availableMusic, availableScenes, VideoInput } from "../interfaces/VideoInput";

export const Video = (input: VideoInput) => {
  const { fps } = useVideoConfig();
  return (
    <div data-theme={input.theme} className="h-full w-full bg-base-200 text-base-content text-7xl font-bold">
      <Series>
        {input.scenes.map((scene, index) => {
          const Scene = availableScenes.find((s) => s.name === scene.name)?.types.find((s, i) => i === scene.type)?.element;
          if (!Scene) return null;
          return (
            <Series.Sequence key={index} durationInFrames={Math.round(fps * (scene.duration > 0 ? scene.duration : 1))}>
              <Scene props={scene.props} input={input} />
            </Series.Sequence>
          );
        })}
      </Series>
      {(input.music.id !== 0 || process.env.REMAOTION_LOCAL) && (
        <Audio src={`/music/${availableMusic[input.music.id].file}`} startFrom={Math.round(input.music.starting * fps)} />
      )}
    </div>
  );
};
