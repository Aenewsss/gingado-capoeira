import { PublicPathsEnum } from "../enums/public-paths.enum";
import { TypeImageEnum } from "../enums/type-image.enum";

export function resolveImagePath(filename: string, type: TypeImageEnum) {
    if (type == TypeImageEnum.EVENT) return "/" + PublicPathsEnum.EVENTS.replace('public', "/") +  filename
    return "/" + PublicPathsEnum.GALLERY.replace('public', "/") +  filename
}