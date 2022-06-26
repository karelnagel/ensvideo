import { chain } from "@wagmi/core";

export const config = {
    appName: "ENS Video",
    textKey: "xyz.ensvideo",
    themes: ["cmyk", "night", "cupcake", "bumblebee", "emerald", "halloween", "forest", "pastel"],
    templates: ["default"],
    remotion: {
        fps: 30,
        height: 1080,
        width: 1920,
        scenes: [
            { name: "hi", duration: 3 },
            { name: "socials", duration: 5 },
        ]
    },
    networks: [
        {
            chain: chain.mainnet,
            graphUrl: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
        },
        {
            chain: chain.goerli,
            graphUrl: "https://api.thegraph.com/subgraphs/name/ensdomains/ensgoerli"
        }
    ]
}
export const network = config.networks[Number(process.env.NEXT_PUBLIC_NETWORK_ID ?? "0")];