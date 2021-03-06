import { useEffect, useState } from "react"
import { config } from "../config"
import { defaultMusic } from "../idk/music"
import { defaultScenes } from "../idk/scene"
import { useQuery } from "./useQuery"
import { useVideoRecord } from "./useVideoRecord"

export function useProps(name: string) {
    const query = useQuery()
    const chain = useVideoRecord(name)

    const [scenes, setScenes] = useState(defaultScenes)
    const [music, setMusic] = useState(defaultMusic)
    const [theme, setTheme] = useState(config.themes[0])

    useEffect(() => {
        setScenes(query.scenes || chain?.scenes || defaultScenes)
        setMusic(query.music || chain?.music || defaultMusic)
        setTheme(query.theme || chain?.theme || config.themes[0])
    }, [chain, query.music, query.scenes, query.theme])

    return {
        scenes,
        music,
        theme
    }
}