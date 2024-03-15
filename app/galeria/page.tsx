import Image from "next/image";
import getMedia from "../actions/get-media.action";
import Top from "../sections/Top";
import { isVideo } from "../utils/is-video.util";
import { resolveImagePath } from "../utils/resolve-image-path.util";
import { TypeImageEnum } from "../enums/type-image.enum";
import Footer from "../components/Footer";

export default async function Gallery() {

    const { media: medias, message } = await getMedia()

    function renderMedia(mediaSrc: string, index: number) {
        if (isVideo(mediaSrc)) return <video key={index} controls className="object-cover bg-gray-300" width={300} height={300} src={resolveImagePath(mediaSrc, TypeImageEnum.GALLERY)}></video>
        return <Image key={index} unoptimized className="h-full object-cover bg-gray-700 rounded" src={resolveImagePath(mediaSrc, TypeImageEnum.GALLERY)} width={300} height={300} alt={"Mídia capoeira " + mediaSrc} />
    }


    return (
        <main>
            <Top onlyShowNavbar={true} />

            <h1 className="my-10 text-5xl text-center">Galeria de Fotos e Vídeos</h1>

            <section className=" px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap gap-10 justify-center">
            {(!medias || medias.length == 0) && <p>Nenhuma mídia adicionada até o momento</p>}

                {
                    medias.map((media, index) =>
                        renderMedia(media, index)
                    )
                }
            </section>

            <div className="mt-20"></div>
            <Footer />
        </main >
    )
}