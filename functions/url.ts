
import { config } from "../config";
import { Scene } from "../interfaces/VideoInput";
import { namehash } from '@ensdomains/ui'
import { useProvider, useSigner } from "wagmi";
import { Contract } from "ethers";

export const getUrl = ({ baseUrl, theme, scenes, name }: { baseUrl?: string, name: string, theme: string, scenes: Scene[] }) => {
    const encodedScenes = encodeURIComponent(JSON.stringify(scenes));
    const params = Object.entries({ theme, scenes: encodedScenes }).map(e => e.join('=')).join('&');
    return `${baseUrl || ""}/${name}?${params}`;
}
export const useSetText = () => {
    const { data: signer } = useSigner()
    const provider = useProvider()
    const key = config.textKey

    const setText = async (name: string, value: string) => {
        const resolver = await provider.getResolver(name);
        if (!resolver || !signer) return;

        const contract = new Contract(resolver.address, ["function setText(bytes32 node, string calldata key, string calldata value)"], signer)

        const node = namehash(name)

        const result = await contract.setText(node, key, value)
        await result.wait(1)

    }
    return setText
}