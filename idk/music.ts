export interface Music {
    id: number,
    starting: number
}

export const defaultMusic: Music = { id: 0, starting: 0 }

export const availableMusic = [
    { name: "No music", file: null },
    { name: "Ambient piano", file: "ambient-piano.mp3" },
    { name: "Epic dramatic action trailer", file: "epic-dramatic-action-trailer.mp3" },
    { name: "Stomping rock four hots", file: "stomping-rock-four-shots.mp3" },
    { name: "Superhero trailer", file: "superhero-trailer.mp3" },
]