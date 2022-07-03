import { Music } from "../idk/music";
import { Scene } from "../idk/scene";

export const getUrl = ({ baseUrl, theme, scenes, name, music }:
    { baseUrl?: string, name?: string, theme: string, scenes: Scene[], music: Music }) => {
    const encodedScenes = encodeURIComponent(JSON.stringify(scenes));
    const encodedMusic = encodeURIComponent(JSON.stringify(music));
    const params = Object.entries({ theme, scenes: encodedScenes, music: encodedMusic }).map(e => e.join('=')).join('&');
    return `${baseUrl || ""}/${name || ""}?${params}`;
}
