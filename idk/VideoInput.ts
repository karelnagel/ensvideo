import { Music } from "./music"
import { Scene } from "./scene"

export interface UserInfo {
    name?:string,
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
}
export interface VideoInput {
    name:string
    userInfo?: UserInfo
    scenes: Scene[]
    theme: string
    music: Music
}
export interface NFT {
    name: string,
    image: string
}

export interface SceneInput {
    props: string[];
    userInfo: UserInfo;
}
