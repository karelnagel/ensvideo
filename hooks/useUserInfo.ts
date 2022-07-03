import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { useEnsQuery } from "../graphql/generated";
import { UserInfo } from "../idk/VideoInput";

export function useUserInfo(name: string) {
    const provider = useProvider();
    const { data } = useEnsQuery({ variables: { name } });
    const [userInfo, setUserInfo] = useState<UserInfo>()

    useEffect(() => {
        const effect = async () => {
            if (!name) return;
            const resolver = await provider.getResolver(name);
            if (!resolver) return;

            const texts = data?.domains[0].resolver?.texts;

            const text = async (key: string) => (texts?.includes(key) ? await resolver.getText(key) : "");
            const avatar = await resolver.getAvatar();
            const email = await text("email");
            const url = await text("url");
            const description = await text("description");
            const twitter = await text("com.twitter");
            const github = await text("com.github");
            const discord = await text("com.discord");

            const address = data?.domains ? data.domains[0].owner.id : "";
            const subdomains: string[] = data?.domains ? (data.domains[0].subdomains.filter((s) => s.name).map((s) => s.name) as string[]) : [];
            const birthday = Number(data?.domains ? data.domains[0].createdAt : "0");

            setUserInfo((v) => ({
                name,
                avatar: avatar?.url,
                email,
                url,
                description,
                twitter,
                github,
                discord,
                address,
                birthday,
                subdomains,
            }));
        };
        effect()
    },[data, name, provider])
    return userInfo
}
