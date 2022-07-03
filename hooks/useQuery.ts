import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Music } from "../idk/music";
import { Scene } from "../idk/scene";

export function useQuery() {
    const router = useRouter();
    const [theme, setTheme] = useState<string>()
    const [scenes, setScenes] = useState<Scene[]>()
    const [music, setMusic] = useState<Music>()

    useEffect(() => {
        if (!theme && router.query.theme) setTheme(router.query.theme.toString() || "");
    }, [router.query.theme, theme]);

    useEffect(() => {
        if (!scenes && router.query.scenes) setScenes(JSON.parse(router.query.scenes?.toString()));
    }, [router.query.scenes, scenes]);

    useEffect(() => {
        if (!music && router.query.music) setMusic(JSON.parse(router.query.music?.toString()));
    }, [router.query.music, music]);

    return {
        theme: theme,
        scenes: scenes,
        music: music
    };
}