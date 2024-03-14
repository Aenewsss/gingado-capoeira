"use client"

import Image from "next/image"
import { resolveImagePath } from "../utils/resolve-image-path.util"
import { TypeImageEnum } from "../enums/type-image.enum"
import removeEvent from "../actions/remove-event.action"
import { useFormState } from "react-dom"
import { useEffect } from "react"

interface IProps {
    events: string[]
}

export default function EventsList(props: IProps) {

    const [messageAction, formAction] = useFormState(removeEvent, { message: "" })

    useEffect(() => {
        if (messageAction.message) {
            alert(messageAction.message)
        }
    }, [messageAction]);
    
    return props.events.map((event, index) =>
        <form action={formAction} key={index} className="hover:scale-105 hover:transition-all relative">
            <Image unoptimized className="h-full object-cover bg-gray-700 rounded" src={resolveImagePath(event, TypeImageEnum.EVENT)} width={300} height={300} alt="Pré visualização da foto do evento que será adicionado" />
            <div className="opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-60 absolute top-0 w-full h-full bg-opacity-60 flex justify-center items-center">
                <input readOnly value={event} name="event" type="text" className="hidden" />
                <button type="submit" className="rounded px-3 py-3 bg-red-700">Excluir Evento</button>
            </div>
        </form>
    )
}