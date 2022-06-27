import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useEnsName, useEnsResolver, useProvider, useSigner } from "wagmi";
import { useEffect, useState } from "react";
import { Player } from "../components/Player";
import { config, network } from "../config";
import { AiFillCloseCircle } from "react-icons/ai";
import { getUrl } from "../functions/getUrl";
import Link from "next/link";
import { uploadJson } from "../functions/uploadJson";
import { useResolver } from "../hooks/useResolver";
import { availableScenes, defaultScenes, Scene, SceneNames } from "../idk/scene";
import { availableMusic, defaultMusic, Music } from "../idk/music";

function Home() {
  const { data: account } = useAccount();
  const { data: name } = useEnsName({ address: account?.address, chainId: network.chain.id });
  const setText = useResolver();
  
  const [show, setShow] = useState<"name" | "no name" | "no address">("no address");
  const [theme, setTheme] = useState(config.themes[0]);
  const [scenes, setScenes] = useState<Scene[]>(defaultScenes);
  const [music, setMusic] = useState<Music>(defaultMusic);

  const saveToChain = async () => {
    console.log("sdfsdfsdfsdfasdf");
    if (!name) return;
    const hash = await uploadJson({ theme, scenes, music });
    if (!hash) return;
    console.log(hash);
    await setText(name, hash);
    console.log("success");
  };

  useEffect(() => {
    if (!account) setShow("no address");
    else if (!name) setShow("no name");
    else setShow("name");
  }, [account, name]);

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
        {show === "no address" && (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold">Connect Your Wallet To Get Started</h2>
            <ConnectButton />
          </div>
        )}
        {show === "no name" && (
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold">You have not set ENS reverse record for this account!</h2>
          </div>
        )}
        {show === "name" && (
          <div className="text-primary-content">
            <h2 className="text-center text-2xl mb-10">
              Modifying video for: <b className="font-bold">{name}</b>
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
                <label htmlFor="">Select Music</label>
                <div className="flex space-x-2">
                  <select
                    className="select select-accent w-full max-w-xs text-base-content"
                    onChange={(e) => setMusic({ id: Number(e.target.value), starting: 0 })}
                  >
                    {availableMusic.map((t, i) => (
                      <option key={i} value={i}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Start"
                    className="input max-w-xs w-20"
                    value={music.starting === 0 ? "" : music.starting}
                    onChange={(e) => setMusic((m) => ({ ...m, starting: Number(e.target.value) }))}
                    disabled={music.id === 0}
                  />
                </div>
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
                        <AiFillCloseCircle
                          onClick={() => setScenes((s) => s.filter((_, i) => i !== index))}
                          className="text-3xl text-secondary bg-white rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setScenes((s) => [...s, { name: "Greeting", type: 0, duration: 3, props: [] }])}
                  >
                    Add scene
                  </button>
                </div>
                <button className="btn btn-secondary" onClick={saveToChain}>
                  Save to chain
                </button>
                <Link href={getUrl({ theme, scenes, name: name!, music })}>
                  <button className="btn btn-secondary">Link</button>
                </Link>
              </div>

              <div className="basis-1/2 rounded-lg overflow-hidden">
                <Player name={name!} theme={theme} scenes={scenes} music={music} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
