import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Reveal from "../components/Reveal";

/** Mosaico (bento): a primeira foto é o destaque e ocupa 2×2 no desktop. */
const FOTOS = [
    { src: "/galeria/home/1image1.png", alt: "Mestre Cristopher realizando salto mortal", legenda: "Salto mortal na roda", grid: "col-span-2 row-span-2" },
    { src: "/galeria/home/4image4.png", alt: "Mestre Cristopher e Mestre Simpson jogando capoeira", legenda: "Jogo de mestres", grid: "" },
    { src: "/galeria/home/2image2.png", alt: "Apresentação de Maculelê", legenda: "Maculelê", grid: "" },
    { src: "/galeria/home/5image5.png", alt: "Cordas de capoeira sendo feitas para troca de graduação", legenda: "Cordas para o batizado", grid: "" },
    { src: "/galeria/home/3image3.png", alt: "Banner Associação Cultural Gingado Capoeira, Mestre Pablo", legenda: "Mestre Pablo", grid: "" },
]

export default function Gallery() {
    return (
        <section className="py-24 bg-white" id="galeria">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                    <Reveal variant="mask">
                        <p className="text-sm tracking-[0.3em] uppercase text-red-600">Galeria</p>
                        <h2 className="mt-2 text-4xl lg:text-6xl text-blue-950">Fotos e Vídeos</h2>
                    </Reveal>
                    <Reveal delay={150}>
                        <Link href="/galeria" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-950 text-white font-medium hover:-translate-y-0.5 transition-transform">
                            Ver galeria completa <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>

                <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[220px] lg:auto-rows-[280px] gap-3">
                    {FOTOS.map((foto, index) =>
                        <Reveal key={foto.src} variant="scale" delay={index * 90} className={`${foto.grid} ${index === FOTOS.length - 1 ? "col-span-2 lg:col-span-1" : ""}`}>
                            <Link href="/galeria" className="group relative block w-full h-full overflow-hidden rounded-2xl bg-slate-200">
                                <Image fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" sizes={index === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"} src={foto.src} alt={foto.alt} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-80 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="absolute left-4 bottom-4 text-white font-medium translate-y-0 lg:translate-y-2 lg:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {foto.legenda}
                                </span>
                            </Link>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    )
}
