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

export type SceneNames = "Greeting" | "NFTs" | "Contact" | "Custom"

export interface Scene { name: SceneNames, type: number, props: string[], duration: number }

export const defaultScenes: Scene[] = [
    { name: "Greeting", type: 0, duration: 3, props: [] },
    { name: "Greeting", type: 2, duration: 3, props: [] },
    { name: "Contact", type: 0, duration: 3, props: [] }]

const greeting = "Hi, I'm {name}"
const contactMe = "Contact me"
const nftTitle = "My NFTs"
const bigText = "Your big text here"
const smallText = "Your small text here"
export const availableScenes = [
    {
        name: "Greeting", types: [
            { props: [greeting], description: "With avatar", element: WithAvatar },
            { props: [greeting, "{description}"], description: "With description", element: WithDescription },
            { props: [greeting, "since {birthday}"], description: "With birthday", element: WithBirthday },
            { props: [greeting], description: "Waving", element: Waving },
        ]
    },
    {
        name: "Contact", types: [
            { props: [contactMe], description: "With email and socials", element: WithEmailSocials },
            { props: [contactMe], description: "With email", element: WithEmail },
            { props: [contactMe], description: "With socials", element: WithSocials },
        ]
    },
    {
        name: "NFTs", types: [
            { props: [nftTitle], description: "grid", element: WithAvatar },
            { props: [nftTitle], description: "gallery", element: WithAvatar },
        ]
    },
    {
        name: "Custom", types: [
            { props: [bigText], description: "Big text", element: Big },
            { props: [bigText, smallText], description: "Big and small text", element: BigAndSmall },
            { props: [bigText, "/ens.svg"], description: "Image and big text", element: BigAndImage },
        ]
    }
]
