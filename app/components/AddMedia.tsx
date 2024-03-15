"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { addMedia } from "../actions/add-media.action";
import { useFormState } from "react-dom";
import { IMedia } from "../interfaces";

export default function AddMedia() {

    const [messageAction, formAction] = useFormState(addMedia, { message: "" })

    const [currentMedia, setCurrentMedia] = useState<IMedia>({ src: "", type: "image" });

    useEffect(() => {
        if (messageAction.message) {
            alert(messageAction.message)
            clearCurrentMedia()
        }
    }, [messageAction]);

    function clearCurrentMedia() { setCurrentMedia({ src: "", type: "image" }) }

    function handleMedia(e: any) {
        const file = e.target.files[0] as File

        if (!file) alert('Nenhum arquivo selecionado')

        const url = URL.createObjectURL(file)

        const type = file.type.includes("image") ? "image" : "video"

        setCurrentMedia({ src: url, type })
    }

    function renderMedia() {
        if (currentMedia.src)
            return currentMedia.type == "video"
                ? <video controls className="object-cover bg-gray-300" width={300} height={300} src={currentMedia.src}></video>
                : <Image className="object-cover bg-gray-300" src={currentMedia.src} width={500} height={300} alt="Pré visualização da foto que será adicionada" />
        return null
    }

    return (
        <>
            <label style={currentMedia.src ? { cursor: 'auto' } : { cursor: 'pointer' }} htmlFor="new-media" className="bg-black rounded pb-10 hover:transition-all hover:scale-105 shadow-slate-600 shadow-md">
                <form action={formAction}>
                    <div className="flex flex-col" style={currentMedia.src ? { pointerEvents: 'none', opacity: "50%" } : { pointerEvents: 'auto', opacity: "100%" }}>
                        <Image className="w-full" src="/admin-galeria.jpg" width={300} height={300} alt="Foto para Adicionar Mídia" />
                        <input name="media" onChange={handleMedia} id="new-media" accept="image/*, video/*" type="file" className="hidden" />

                        {!currentMedia.src && <p className="rounded py-4 mx-10 mt-10 text-center bg-blue-900">Clique aqui para adicionar uma mídia</p>}
                    </div>


                    <div className="mx-10 mt-10" style={!currentMedia.src ? { display: 'none' } : { display: "block" }}>
                        <h2>Você tem certeza que deseja inserir essa mídia?</h2>
                        <div className="flex gap-4 mt-4 justify-center">
                            <button onClick={clearCurrentMedia} type="reset" className="rounded p-3 bg-red-700">Cancelar</button>
                            <button type="submit" className="rounded p-3 bg-blue-900">Sim</button>
                        </div>
                    </div>
                </form>
            </label>

            {
                renderMedia()
            }
        </>
    )
}