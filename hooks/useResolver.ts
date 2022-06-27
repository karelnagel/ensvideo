import { Contract } from "ethers"
import { namehash } from "ethers/lib/utils"
import { useProvider, useSigner } from "wagmi"
import { config } from "../config"

export const useResolver = () => {
    const { data: signer } = useSigner()
    const provider = useProvider()
    const key = config.textKey

    const setText = async (name: string, value: string) => {
        const resolver = await provider.getResolver(name);
        if (!resolver || !signer) return;
        
        const abi = ["function setText(bytes32 node, string calldata key, string calldata value)"]
        const contract = new Contract(resolver.address, abi, signer)

        const node = namehash(name)

        const result = await contract.setText(node, key, value)
        await result.wait(1)
    }
    return setText
}