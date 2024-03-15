"use client"

import Image from "next/image"
import { resolveImagePath } from "../utils/resolve-image-path.util"
import { TypeImageEnum } from "../enums/type-image.enum"
import removeMedia from "../actions/remove-media.action"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { isVideo } from "../utils/is-video.util"
import { XCircleIcon } from "@heroicons/react/16/solid"

interface IProps {
    media: string[]
}

export default function MediaList(props: IProps) {

    const [messageAction, formAction] = useFormState(removeMedia, { message: "" })

    const [openMedia, setOpenMedia] = useState<string>('');

    useEffect(() => {
        if (messageAction.message) {
            alert(messageAction.message)
        }
    }, [messageAction]);

    function renderMedia(mediaSrc: string) {
        if (isVideo(mediaSrc)) return <video controls className="h-full object-cover bg-gray-300" width={300} height={300} src={resolveImagePath(mediaSrc, TypeImageEnum.GALLERY)}></video>
        return <Image unoptimized className="h-full object-cover bg-gray-700 rounded" src={resolveImagePath(mediaSrc, TypeImageEnum.GALLERY)} width={300} height={300} alt="Pré visualização da foto do mediao que será adicionado" />
    }

    function handleOpenMedia(mediaSrc: string) {
        if (openMedia) clearOpenMedia()
        else setOpenMedia(mediaSrc)
    }

    function renderOpenMedia() {
        if (isVideo(openMedia)) {
            return <div className="fixed w-4/5 left-auto top-0 flex justify-center bg-black h-full bg-opacity-80">
                <video controls className="w-auto" width={300} height={300} src={resolveImagePath(openMedia, TypeImageEnum.GALLERY)}></video>
                <XCircleIcon color="red" onClick={clearOpenMedia} className="cursor-pointer absolute top-10 right-10" width={60} />
            </div>
        }
        return <div className="fixed w-4/5 left-auto top-0 flex justify-center bg-black h-full bg-opacity-80">
            <Image unoptimized className="w-auto" src={resolveImagePath(openMedia, TypeImageEnum.GALLERY)} width={300} height={300} alt="Pré visualização da mídia que será adicionada" />
            <XCircleIcon color="red" onClick={clearOpenMedia} className="cursor-pointer absolute top-10 right-10" width={60} />
        </div>
    }

    function clearOpenMedia() {
        setOpenMedia('')
    }

    return (
        <>
            {
                props.media.map((media, index) =>
                    <form action={formAction} key={index} className="hover:scale-105 hover:transition-all relative">
                        {renderMedia(media)}
                        <div className="opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-60 absolute top-0 w-full h-full bg-opacity-60 flex justify-center items-center">
                            <input readOnly value={media} name="media" type="text" className="hidden" />
                            <div className="flex flex-col gap-4">
                                <button onClick={() => handleOpenMedia(media)} type="reset" className="rounded p-3 bg-blue-900">Visualizar mídia</button>
                                <button type="submit" className="rounded px-3 py-3 bg-red-700">Excluir mídia</button>
                            </div>
                        </div>
                    </form>
                )
            }

            {openMedia && renderOpenMedia()}

        </>
    )
}