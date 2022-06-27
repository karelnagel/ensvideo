import { UserInfo } from "../../idk/VideoInput";

export function useText(props: string[], userInfo: UserInfo, defaultProps: string[]) {
    const arrayLength = props.length > defaultProps.length ? props.length : defaultProps.length;
    const returnValue = []

    const birthday = new Date((userInfo.birthday || 0) * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (let i = 0; i < arrayLength; i++) {
        returnValue[i] = (props[i] || defaultProps[i])
            .replace("{name}", userInfo.name)
            .replace("{avatar}", userInfo.avatar ?? "")
            .replace("{description}", userInfo.description ?? "")
            .replace("{address}", userInfo.address ?? "")
            .replace("{discord}", userInfo.discord ?? "")
            .replace("{github}", userInfo.github ?? "")
            .replace("{email}", userInfo.email ?? "")
            .replace("{url}", userInfo.url ?? "")
            .replace("{birthday}", `${monthNames[birthday.getMonth()]} ${birthday.getFullYear()}`)
            .replace("{subdomains}", userInfo.subdomains?.join(", ") ?? "")
            .replace("{twitter}", userInfo.twitter ?? "")
    }
    return returnValue;
}