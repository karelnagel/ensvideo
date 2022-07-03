import axios from "axios";
import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { config } from "../config";
import { Music } from "../idk/music";
import { Scene } from "../idk/scene";

export function useVideoRecord(name: string) {
    const provider = useProvider();
    const [scenes, setScenes] = useState<Scene[]>();
    const [music, setMusic] = useState<Music>()
    const [theme, setTheme] = useState<string>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function effect() {
            const resolver = await provider.getResolver(name.toString());
            if (!resolver) return;

            const hash = await resolver.getText(config.textKey);
            if (!hash) return

            const result = await axios.get(`https://ipfs.io/ipfs/${hash}`);
            setScenes(result.data.scenes);
            setMusic(result.data.music)
            setTheme(result.data.theme)
            setLoading(false)
        }
        if (loading && name) effect()
    }, [loading, provider, name])

    return loading ? null : { scenes, music, theme }
}