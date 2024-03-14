"use client"

import Image from "next/image"
import { resolveImagePath } from "../utils/resolve-image-path.util"
import { TypeImageEnum } from "../enums/type-image.enum"
import removeMedia from "../actions/remove-media.action"
import { useFormState } from "react-dom"
import { useEffect } from "react"

interface IProps {
    media: string[]
}

export default function MediaList(props: IProps) {

    const [messageAction, formAction] = useFormState(removeMedia, { message: "" })

    useEffect(() => {
        if (messageAction.message) {
            alert(messageAction.message)
        }
    }, [messageAction]);

    function renderMedia(mediaSrc: string) {
        const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv', '.webm', '.mpeg'];
        const fileExtension = mediaSrc.substring(mediaSrc.lastIndexOf('.'));

        if (videoExtensions.includes(fileExtension)) return <video controls className="h-full object-cover bg-gray-300" width={300} height={300} src={resolveImagePath(mediaSrc, TypeImageEnum.GALLERY)}></video>
        return <Image unoptimized className="h-full object-cover bg-gray-700 rounded" src={resolveImagePath(mediaSrc, TypeImageEnum.GALLERY)} width={300} height={300} alt="Pré visualização da foto do mediao que será adicionado" />
    }

    return props.media.map((media, index) =>
        <form action={formAction} key={index} className="hover:scale-105 hover:transition-all relative">
            {renderMedia(media)}
            <div className="opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-60 absolute top-0 w-full h-full bg-opacity-60 flex justify-center items-center">
                <input readOnly value={media} name="media" type="text" className="hidden" />
                <button type="submit" className="rounded px-3 py-3 bg-red-700">Excluir mídia</button>
            </div>
        </form>
    )
}