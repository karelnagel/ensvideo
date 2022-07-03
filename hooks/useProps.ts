import { useEffect, useState } from "react"
import { config } from "../config"
import { defaultMusic } from "../idk/music"
import { defaultScenes } from "../idk/scene"
import { useQuery } from "./useQuery"
import { useVideoRecord } from "./useVideoRecord"

export function useProps(name?: string) {
    const query = useQuery()
    const chain = useVideoRecord(name || query.name!)
    const [scenes, setScenes] = useState(defaultScenes)
    const [music, setMusic] = useState(defaultMusic)
    const [theme, setTheme] = useState(config.themes[0])

    useEffect(() => {
        if (chain) {
            console.log("tra")
            setScenes(query.scenes || chain.scenes || defaultScenes)
            setMusic(query.music || chain.music || defaultMusic)
            setTheme(query.theme || chain.theme || config.themes[0])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chain])

    console.log({ scenes, music, theme })
    return {
        name: name || query.name || "",
        scenes,
        music,
        theme
    }
}