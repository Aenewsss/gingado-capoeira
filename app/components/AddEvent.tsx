"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { addEvent } from "../actions/add-event.action";
import { useFormState } from "react-dom";

export default function AddEvent() {

    const [messageAction, formAction] = useFormState(addEvent, { message: "" })

    const [currentEventImage, setCurrentEventImage] = useState<string>('');

    useEffect(() => {
        if (messageAction.message) {
            alert(messageAction.message)
            clearEventImage()
        }
    }, [messageAction]);

    function clearEventImage() { setCurrentEventImage('') }

    function handleEvent(e: any) {
        const file = e.target.files[0] as File

        if (!file) alert('Nenhum arquivo selecionado')

        const url = URL.createObjectURL(file)

        setCurrentEventImage(url)
    }


    return (
        <>
            <label style={currentEventImage ? { cursor: 'auto' } : { cursor: 'pointer' }} htmlFor="new-event" className="bg-black rounded pb-10 hover:transition-all hover:scale-105 shadow-slate-600 shadow-md">
                <form action={formAction}>
                    <div className="flex flex-col" style={currentEventImage ? { pointerEvents: 'none', opacity: "50%" } : { pointerEvents: 'auto', opacity: "100%" }}>
                        <Image className="w-full" src="/admin-eventos.jpeg" width={300} height={300} alt="Foto para Adicionar Evento" />
                        <input name="event" onChange={handleEvent} id="new-event" accept="image/*" type="file" className="hidden" />
                        
                        {!currentEventImage && <p className="rounded py-4 mx-10 mt-10 text-center bg-blue-900">Clique aqui para adicionar um evento</p>}
                    </div>


                    <div className="mx-10 mt-10" style={!currentEventImage ? { display: 'none' } : { display: "block" }}>
                        <h2>Você tem certeza que deseja inserir esse evento?</h2>
                        <div className="flex gap-4 mt-4 justify-center">
                            <button onClick={clearEventImage} type="reset" className="rounded p-3 bg-red-700">Cancelar</button>
                            <button type="submit" className="rounded p-3 bg-blue-900">Sim</button>
                        </div>
                    </div>
                </form>
            </label>

            {
                currentEventImage && <Image className="object-cover bg-gray-300" src={currentEventImage} width={500} height={300} alt="Pré visualização da foto do evento que será adicionado" />
            }
        </>
    )
}