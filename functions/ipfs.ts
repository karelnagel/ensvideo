import { create } from 'ipfs-http-client'


const authorization = "Basic " + Buffer.from(process.env.NEXT_PUBLIC_IPFS_PUBLIC + ":" + process.env.NEXT_PUBLIC_IPFS_PRIVATE).toString("base64");

export async function uploadJson(object: {}) {
    try {
        const ipfs = create({
            url: "https://ipfs.infura.io:5001/api/v0",
            headers: {
                authorization,
            },
        });
        const data = JSON.stringify(object, null, 2)
        const result = await ipfs.add(data)
        const hash = result.cid.toString()
        if (!hash) return null;
        return hash
    }
    catch (e) {
        console.log(e);
        return null
    }
}
