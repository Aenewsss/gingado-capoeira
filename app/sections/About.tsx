import Image from "next/image";
import Reveal from "../components/Reveal";

const PARAGRAFOS = [
    "A Associação Cultural Gingado Capoeira, foi fundada no dia 13 de setembro de 2006, na cidade de Brasilia-DF, tendo como fundador, Pablo Balduino de Magalhães (Mestre Pablo).",
    "Nossa proposta é desenvolver a capoeira como um todo, buscar um padrão na metodologia de ensino e prática de várias modalidades que compõem a capoeira como arte, cultura, desporto, profissão e filosofia de vida.",
    "Todavia, nossa principal proposta é a capoeira como luta, resgatar a valorização pelo verdadeiro Mestre de Capoeira, mas, acima de tudo, mostrar que o capoeirista é um atleta, um poeta, um divulgador de uma arte totalmente brasileira.",
]

const FOTOS = [
    { src: "/foto-quem-somos.png", alt: "Foto jogo de capoeira, Sobre A Associação Cultural Gingado Capoeira" },
    { src: "/sistema-graduacao/infantil-foto.png", alt: "Foto Graduação Infantil" },
    { src: "/sistema-graduacao/adulto-foto.png", alt: "Foto Graduação adulto" },
]

export default function About() {
    return (
        <section className="py-24 bg-white" id="sobre">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <Reveal>
                        <p className="text-sm tracking-[0.3em] uppercase text-red-600">Desde 2006</p>
                        <h2 className="mt-2 text-4xl lg:text-6xl text-blue-950">Associação Cultural Gingado Capoeira</h2>
                    </Reveal>
                    {PARAGRAFOS.map((paragrafo, index) =>
                        <Reveal key={index} delay={150 + index * 140}>
                            <p className="text-base lg:text-lg mt-6 font-light leading-8 text-slate-700">{paragrafo}</p>
                        </Reveal>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {FOTOS.map((foto, index) =>
                        <Reveal key={foto.src} variant="clip" delay={index * 150} className={`overflow-hidden rounded-3xl shadow-2xl group ${index === 0 ? "col-span-2" : ""}`}>
                            <Image className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${index === 0 ? "h-64 sm:h-80" : "h-44 sm:h-56"}`} unoptimized src={foto.src} width={704} height={469} alt={foto.alt} />
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    )
}
