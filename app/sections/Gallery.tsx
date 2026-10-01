import Image from "next/image";
import Link from "next/link";
import Reveal from "../components/Reveal";

function Photo({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
    return (
        <div className={`overflow-hidden group ${className}`}>
            <Image className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" unoptimized src={src} width={500} height={500} alt={alt} />
        </div>
    )
}

export default function Gallery() {

    return (
        <section className="pt-24 bg-white flex justify-center flex-col" id="galeria">
            <Reveal className="px-4 text-center">
                <p className="text-sm tracking-[0.3em] uppercase text-red-600">Galeria</p>
                <h2 className="mt-2 text-4xl lg:text-6xl text-blue-950">Fotos e Vídeos</h2>
            </Reveal>

            <Link href="/galeria" className="relative flex sm:h-screen mt-10 sm:flex-row flex-col group/gallery">
                <Reveal variant="fade-left" className="flex flex-col sm:w-1/3 w-full">
                    <Photo src="/galeria/home/1image1.png" alt="Mestre Cristopher realizando salto mortal" />
                    <Photo className="h-full" src="/galeria/home/2image2.png" alt="Apresentação de Maculelê" />
                </Reveal>
                <Reveal variant="fade-up" delay={120} className="sm:w-1/3 w-full">
                    <Photo className="h-full" src="/galeria/home/3image3.png" alt="Banner Associação Cultural Gingado Capoeira, Mestre Pablo" />
                </Reveal>
                <Reveal variant="fade-right" delay={240} className="flex flex-col sm:w-1/3 w-full">
                    <Photo className="h-1/3" src="/galeria/home/4image4.png" alt="Mestre Cristopher e Mestre Simpson jogando capoeira" />
                    <Photo className="h-full" src="/galeria/home/5image5.png" alt="Cordas de capoeira sendo feitas para troca de graduação" />
                </Reveal>
                <span className="absolute left-1/2 bottom-8 -translate-x-1/2 px-6 py-3 rounded-full bg-white/90 backdrop-blur text-blue-950 font-medium shadow-xl transition-all group-hover/gallery:-translate-y-1">
                    Ver galeria completa →
                </span>
            </Link>
        </section>
    )
}
