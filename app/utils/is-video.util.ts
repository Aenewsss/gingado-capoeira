
export function isVideo(mediaSrc: string) {
    const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.mpeg'];
    const fileExtension = mediaSrc.substring(mediaSrc.lastIndexOf('.'));

    return videoExtensions.includes(fileExtension)
}