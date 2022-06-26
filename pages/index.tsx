import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName, useProvider, useSigner } from "wagmi";
import { useState } from "react";
import { Player } from "../components/Player";
import { config } from "../config";
import { availableScenes, defaultScenes, Scene, SceneNames } from "../interfaces/VideoInput";
import { AiFillCloseCircle } from "react-icons/ai";
import { getUrl, setText } from "../functions/url";
import Link from "next/link";

function Home() {
  const { data: account } = useAccount();
  const { data: name } = useEnsName({ address: account?.address });
  const [theme, setTheme] = useState(config.themes[0]);
  const [scenes, setScenes] = useState<Scene[]>(defaultScenes);
  const signer = useSigner();

  const saveToChain = async () => {
    console.log("sdfsdfsdfsdfasdf")
    if (!name) return;
    const ipfsHash = "ipfshash";
    await setText(name, ipfsHash, signer);
  };
  return (
    <div className="min-h-full">
      <div className="hero">
        <div className="hero-content flex-col space-y-6 p-32">
          <h1 className="text-7xl font-bold text-primary">Personal ENS Video</h1>
          <h3 className="text-2xl font-bold max-w-screen-sm text-center">
            Create your own personal ENS greeting video in just seconds, all data on chain!
          </h3>
          <Link href={"/vitalik.eth"}>
            <button className="btn btn-primary">Watch Demo</button>
          </Link>
        </div>
      </div>

      <div className=" bg-gradient-to-tr from-primary to-secondary w-full p-10 h-full">
        {!account && (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold">Connect Your Wallet To Get Started</h2>
            <ConnectButton />
          </div>
        )}
        {name && (
          <div className="text-primary-content">
            <h2 className="text-center text-2xl mb-10">
              Modifying video for: <span className="font-bold">{name}</span>
            </h2>
            <div className="flex ">
              <div className="basis-1/2 flex flex-col items-start">
                <label htmlFor="">Select Theme</label>
                <select className="select select-accent w-full max-w-xs text-base-content" onChange={(e) => setTheme(e.target.value)}>
                  {config.themes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div>
                  <h3>Scenes</h3>
                  <div className="flex flex-col space-y-2 text-base-content">
                    {scenes.map((scene, index) => (
                      <div className="flex items-center space-x-2" key={index}>
                        <select
                          className="select w-40"
                          value={scene.name}
                          onChange={(e) =>
                            setScenes((s) =>
                              s.map((s2, i) => (i === index ? { name: e.target.value as SceneNames, type: 0, duration: s2.duration, props: [] } : s2))
                            )
                          }
                        >
                          {availableScenes.map((s, i) => (
                            <option value={s.name} key={i}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                        <select
                          className="select w-40"
                          value={scene.type}
                          onChange={(e) => setScenes((s) => s.map((s2, i) => (i === index ? { ...s2, type: Number(e.target.value) } : s2)))}
                        >
                          {availableScenes
                            .find((s) => s.name === scene.name)
                            ?.types.map((s, i) => (
                              <option value={i} key={i}>
                                {s.description}
                              </option>
                            ))}
                        </select>
                        <input
                          type="number"
                          placeholder="Duration"
                          className="input max-w-xs w-20"
                          value={scene.duration === 0 ? "" : scene.duration}
                          onChange={(e) => setScenes((s) => s.map((s2, i) => (i === index ? { ...s2, duration: Number(e.target.value) } : s2)))}
                        />
                        {availableScenes
                          .find((s) => s.name === scene.name)
                          ?.types.find((_, i) => i === scene.type)
                          ?.props.map((prop, propIndex) => (
                            <input
                              key={propIndex}
                              className="input w-40"
                              placeholder={prop}
                              value={scene.props[propIndex] || ""}
                              onChange={(e) => {
                                const props = scene.props;
                                props[propIndex] = e.target.value;
                                setScenes((s) => s.map((s2, i) => (i === index ? { ...s2, props } : s2)));
                              }}
                            />
                          ))}
                        <button>
                          <AiFillCloseCircle
                            onClick={() => setScenes((s) => s.filter((_, i) => i !== index))}
                            className="text-3xl text-secondary bg-white rounded-full"
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setScenes((s) => [...s, { name: "Greeting", type: 0, duration: 5, props: [] }])}
                  >
                    Add scene
                  </button>
                </div>
                <button className="btn btn-secondary" onClick={saveToChain}>
                  Save To Blockchain
                </button>
                <Link className="btn btn-secondary" href={getUrl({ theme, scenes, name })}>
                  Link
                </Link>
              </div>

              <div className="basis-1/2 rounded-lg overflow-hidden">
                <Player name={name} theme={theme} scenes={scenes} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
