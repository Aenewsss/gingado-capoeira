"use client"

import Image from "next/image"
import { resolveImagePath } from "../utils/resolve-image-path.util"
import { TypeImageEnum } from "../enums/type-image.enum"
import removeEvent from "../actions/remove-event.action"
import { useFormState } from "react-dom"
import { useEffect, useState } from "react"
import { XCircleIcon } from "@heroicons/react/16/solid"

interface IProps {
    events: string[]
}

export default function EventsList(props: IProps) {

    const [messageAction, formAction] = useFormState(removeEvent, { message: "" })

    const [openEvent, setOpenEvent] = useState<string>('');

    useEffect(() => {
        if (messageAction.message) {
            alert(messageAction.message)
        }
    }, [messageAction]);

    function handleOpenEvent(eventSrc: string) {
        if (openEvent) clearOpenEvent()
        else setOpenEvent(eventSrc)
    }

    function renderOpenEvent() {
        return <div className="fixed w-4/5 left-auto top-0 flex justify-center bg-black h-full bg-opacity-80">
            <Image unoptimized className="w-auto" src={resolveImagePath(openEvent, TypeImageEnum.EVENT)} width={300} height={300} alt="Visualização do evento" />
            <XCircleIcon color="red" onClick={clearOpenEvent} className="cursor-pointer absolute top-10 right-10" width={60} />
        </div>
    }

    function clearOpenEvent() {
        setOpenEvent('')
    }

    return (
        <>
            {
                props.events.map((event, index) =>
                    <form action={formAction} key={index} className="hover:scale-105 hover:transition-all relative">
                        <Image unoptimized className="h-full object-cover bg-gray-700 rounded" src={resolveImagePath(event, TypeImageEnum.EVENT)} width={300} height={300} alt="Evento" />
                        <div className="opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-60 absolute top-0 w-full h-full bg-opacity-60 flex justify-center items-center">
                            <input readOnly value={event} name="event" type="text" className="hidden" />

                            <div className="flex flex-col gap-4">
                                <button onClick={() => handleOpenEvent(event)} type="reset" className="rounded p-3 bg-blue-900">Visualizar evento</button>
                                <button type="submit" className="rounded px-3 py-3 bg-red-700">Excluir Evento</button>
                            </div>
                        </div>
                    </form>
                )
            }

            {openEvent && renderOpenEvent()}

        </>
    )
}