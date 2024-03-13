"use client"

import Image from "next/image";
import { useState } from "react";
import eventService from "../services/event.service";

export default function AddEvent() {

    const [currentEventImage, setCurrentEventImage] = useState<string>('');

    function addEvent(e: any) {
        const file = e.target.files[0] as File

        if (!file) alert('Nenhum arquivo selecionado')

        const url = URL.createObjectURL(file)

        setCurrentEventImage(url)

        setTimeout(async () => {
            const confirmed = window.confirm('Você tem certeza que deseja inserir esse evento?')

            if (!confirmed) setCurrentEventImage('')
            else await eventService.addEvent(file)

        }, 300);
    }

    return (
        <>
            <label style={{ pointerEvents: currentEventImage ? 'none' : 'auto', opacity: currentEventImage ? '50%' : '100%' }} htmlFor="new-event" className="bg-black rounded pb-10 hover:transition-all hover:scale-105 shadow-slate-600 shadow-md cursor-pointer">
                <Image className="w-full" src="/admin-eventos.jpeg" width={300} height={300} alt="Foto para Adicionar Evento" />
                <p className="rounded py-4 mx-10 mt-10 text-center bg-blue-900">Clique aqui para adicionar um evento</p>
                <input onChange={addEvent} id="new-event" accept="image/*" type="file" className="hidden" />
            </label>

            {
                currentEventImage && <Image className="object-cover bg-gray-300" src={currentEventImage} width={500} height={300} alt="Pré visualização da foto do evento que será adicionado" />
            }
        </>
    )
}