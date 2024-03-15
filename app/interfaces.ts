export interface IEventsResponse {
    events: string[]
    message: string
}

export interface IMediaResponse {
    media: string[]
    message: string
}

export interface IMedia {
    src: string
    type: "video" | "image"
}