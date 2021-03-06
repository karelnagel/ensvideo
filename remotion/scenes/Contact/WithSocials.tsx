import { AbsoluteFill } from "remotion";
import { SceneInput } from "../../../idk/VideoInput";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";
import { useText } from "../../hooks/usetText";

export function WithSocials({ props, userInfo }: SceneInput) {
  const [title] = useText(props, userInfo, ["Contact me"]);

  const socials = [
    { icon: FaTwitter, user: userInfo.twitter },
    { icon: FaGithub, user: userInfo.github },
    { icon: FaDiscord, user: userInfo.discord },
  ];
  return (
    <AbsoluteFill className="flex justify-center items-center space-y-10">
      <h1 className="text-9xl text-primary">{title}</h1>
      <div className="grid text-5xl  gap-4 grid-cols-3">
        {socials.filter(s=>!!s.user).map((social, index) => (
          <div key={index} className="flex flex-col items-center">
            <social.icon className="text-6xl" />
            <h3>{social.user}</h3>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}
