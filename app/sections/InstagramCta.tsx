import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";
import InstagramIcon from "../components/InstagramIcon";
import { CONTATO } from "../data/contato";

const FOTOS = ["/galeria/home/4image4.png", "/galeria/home/1image1.png", "/galeria/home/2image2.png", "/galeria/home/5image5.png"]

/** Chamada para o Instagram do grupo, logo antes do rodapé. */
export default function InstagramCta() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal variant="scale" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] p-1">
                    <div className="rounded-[1.4rem] bg-white grid lg:grid-cols-2 gap-10 items-center p-8 sm:p-12">
                        <div>
                            <p className="text-sm tracking-[0.3em] uppercase text-red-600">Siga a Gingado</p>
                            <h2 className="mt-2 text-4xl lg:text-5xl text-blue-950">Rodas, eventos e treinos no Instagram</h2>
                            <p className="mt-4 text-lg font-light text-slate-600">Acompanhe as novidades do grupo, os batizados e as apresentações.</p>
                            <Link href={CONTATO.instagramUrl} target="_blank" className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#d62976] to-[#4f5bd5] text-white font-medium shadow-lg shadow-pink-900/20 hover:-translate-y-0.5 transition-transform">
                                <InstagramIcon /> @{CONTATO.instagram}
                            </Link>
                        </div>

                        <Link href={CONTATO.instagramUrl} target="_blank" aria-label={`Abrir @${CONTATO.instagram} no Instagram`} className="grid grid-cols-2 gap-3">
                            {FOTOS.map((foto, index) =>
                                <span key={foto} className={`group relative block aspect-square overflow-hidden rounded-2xl ${index % 2 ? "translate-y-6" : ""}`}>
                                    <Image fill sizes="(min-width: 1024px) 280px, 45vw" src={foto} alt="" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 group-hover:bg-black/40 group-hover:opacity-100 transition-all">
                                        <InstagramIcon className="w-8 h-8" />
                                    </span>
                                </span>
                            )}
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
