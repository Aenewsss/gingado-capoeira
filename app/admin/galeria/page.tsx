"use client"

import getMedia from "@/app/actions/get-media.action"
import AddMedia from "@/app/components/AddMedia"
import MediaList from "@/app/components/MediaList"
import Link from "next/link"
import { useEffect, useState } from "react";

export default async function Gallery() {

    const [medias, setMedia] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        async function fetchMedia() {
            const { media: medias, message} = await getMedia()
            setMedia(medias)
            setMessage(message)
        }
        fetchMedia()
    }, []);

    return (
        <main className="my-10 flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl text-center">Galeria de Fotos e Vídeos</h1>

            <div className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap gap-4 w-full sm:justify-normal justify-center">
                <AddMedia />
                {
                    !medias.length
                        ? <p className="mt-10 h-full flex self-center text-red-500 text-2xl w-1/2 justify-center">{message}</p>
                        : <MediaList media={medias} />
                }
            </div>
            <Link className="absolute top-0 left-10" href="/admin">← Voltar</Link>
        </main >
    )
}