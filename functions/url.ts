
import { config } from "../config";
import { Scene } from "../interfaces/VideoInput";
import { setupENS } from '@ensdomains/ui'

export const getUrl = ({ baseUrl, theme, scenes, name }: { baseUrl?: string, name: string, theme: string, scenes: Scene[] }) => {
    const encodedScenes = encodeURIComponent(JSON.stringify(scenes));
    const params = Object.entries({ theme, scenes: encodedScenes }).map(e => e.join('=')).join('&');
    return `${baseUrl || ""}/${name}?${params}`;
}
export const setText = async (name: string, value: string, customProvider: any) => {
    const { ens } = await setupENS()
    // const { ens } = await setupENS({ customProvider, ensAddress: name, enforceReadOnly: false, enforceReload: false, reloadOnAccountsChange: false })
    const key = config.textKey
    const tx = await ens.setText(name, key, value)
    console.log(tx.hash)
    await tx.wait()
    
}