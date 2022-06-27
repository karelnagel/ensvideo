import { Music } from "./music"
import { Scene } from "./scene"

export interface UserInfo {
    NFTs?: NFT[],
    birthday?: number,
    balance?: string,
    address?: string,
    subdomains?: string[]

    avatar?: string,
    description?: string,
    email?: string,
    url?: string,
    twitter?: string,
    github?: string,
    discord?: string,
    name: string,
}
export interface VideoInput {
    userInfo: UserInfo
    scenes: Scene[]
    theme: string
    music: Music
    isReady?: boolean
}
export interface NFT {
    name: string,
    image: string
}

export interface SceneInput {
    props: string[];
    userInfo: UserInfo;
}
