import { useRouter } from "next/router";
import { Music } from "../idk/music";
import { Scene } from "../idk/scene";

export function useQuery() {
    const router = useRouter();
    const { theme, scenes, name, music } = router.query;

    return {
        theme: theme ? theme.toString() : undefined,
        scenes: scenes ? JSON.parse(scenes.toString()) as Scene[]: undefined,
        name: name ? name.toString() : undefined,
        music: music ? JSON.parse(music.toString()) as Music : undefined
    };
}