import { chain } from "@wagmi/core";

export const config = {
    appName: "ENS Video",
    textKey: "xyz.ensvideo",
    themes: ["cmyk", "dark", "light", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
    templates: ["default"],
    remotion: {
        fps: 30,
        height: 1080,
        width: 1920,
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