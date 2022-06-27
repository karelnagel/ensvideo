import { VideoInput } from "../../interfaces/VideoInput";

export function useText(props: string[], input: VideoInput, defaultProps: string[]) {
    const arrayLength = props.length > defaultProps.length ? props.length : defaultProps.length;
    const returnValue = []

    const birthday = new Date((input.birthday || 0) * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    for (let i = 0; i < arrayLength; i++) {
        returnValue[i] = (props[i] || defaultProps[i])
            .replace("{name}", input.name)
            .replace("{avatar}", input.avatar ?? "")
            .replace("{description}", input.description ?? "")
            .replace("{address}", input.address ?? "")
            .replace("{discord}", input.discord ?? "")
            .replace("{github}", input.github ?? "")
            .replace("{email}", input.email ?? "")
            .replace("{url}", input.url ?? "")
            .replace("{birthday}", `${monthNames[birthday.getMonth()]} ${birthday.getFullYear()}`)
            .replace("{subdomains}", input.subdomains?.join(", ") ?? "")
            .replace("{twitter}", input.twitter ?? "")
    }
    return returnValue;
}