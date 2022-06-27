import { WithEmail } from "../remotion/scenes/Contact/WithEmail"
import { WithEmailSocials } from "../remotion/scenes/Contact/WithEmailSocials"
import { WithSocials } from "../remotion/scenes/Contact/WithSocials"
import { Big } from "../remotion/scenes/Custom/Big"
import { BigAndImage } from "../remotion/scenes/Custom/BigAndImage"
import { BigAndSmall } from "../remotion/scenes/Custom/BigAndSmall"
import { Waving } from "../remotion/scenes/Greeting/Waving"
import { WithAvatar } from "../remotion/scenes/Greeting/WithAvatar"
import { WithBirthday } from "../remotion/scenes/Greeting/WithBirthday"
import { WithDescription } from "../remotion/scenes/Greeting/WithDescription"

export interface PlayerProps {
    name: string,
    theme: string,
}
export interface VideoInput extends PlayerProps {
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

    isReady?: boolean
    scenes: Scene[]
    theme: string
    music: Music
}
export interface NFT {
    name: string,
    image: string
}
export interface Social {
    name: string,
    url: string
}
export type SceneNames = "Greeting" | "NFTs" | "Contact" | "Custom"

export interface Scene { name: SceneNames, type: number, props: string[], duration: number }

export const defaultScenes: Scene[] = [
    { name: "Greeting", type: 0, duration: 3, props: [] },
    { name: "Greeting", type: 2, duration: 3, props: [] },
    { name: "Contact", type: 0, duration: 3, props: [] }]

const idk = "greeting,1,[greeting],3;"// name,type,props?,duration?;

export const availableScenes = [
    {
        name: "Greeting", types: [
            { props: ["greeting"], description: "With avatar", element: WithAvatar },
            { props: ["greeting"], description: "With description", element: WithDescription },
            { props: ["greeting"], description: "With birthday", element: WithBirthday },
            { props: ["greeting"], description: "Waving", element: Waving },
            // { props: ["greeting", "message"], description: "With message", element: Waving },
        ]
    },
    {
        name: "Contact", types: [
            { props: ["title"], description: "with email and socials", element: WithEmailSocials },
            { props: ["title"], description: "with email", element: WithEmail },
            { props: ["title"], description: "with socials", element: WithSocials },
        ]
    },
    {
        name: "NFTs", types: [
            { props: ["title"], description: "grid", element: WithAvatar },
            { props: ["title"], description: "gallery", element: WithAvatar },
        ]
    },
    {
        name: "Custom", types: [
            { props: ["big",], description: "Big", element: Big },
            { props: ["big", "small"], description: "Big and small", element: BigAndSmall },
            { props: ["big", "imageUrl"], description: "Image and big", element: BigAndImage },
        ]
    }
]
export interface SceneInput {
    props: string[];
    input: VideoInput;
}

export const availableMusic = [
    { name: "No music", file: null },
    { name: "Ambient piano", file: "ambient-piano.mp3" },
    { name: "Epic dramatic action trailer", file: "epic-dramatic-action-trailer.mp3" },
    { name: "Stomping rock four hots", file: "stomping-rock-four-shots.mp3" },
    { name: "Superhero trailer", file: "superhero-trailer.mp3" },
]
export interface Music {
    id: number,
    starting: number
}
export const defaultMusic: Music = { id: 0, starting: 0 }