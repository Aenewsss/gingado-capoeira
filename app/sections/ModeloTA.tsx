import Image from "next/image";
import Reveal from "../components/Reveal";

export default function ModeloTA() {
    return (
        <section className="py-10 pt-20 bg-white flex justify-center flex-col items-center gap-4">
            <Reveal className="px-4">
                <h2 className="text-4xl lg:text-6xl text-center text-blue-950">Modelo de Transparência Ativa</h2>
            </Reveal>

            <Reveal variant="scale" delay={150}>
                <Image className="transition-transform duration-500 hover:scale-105" width={600} height={300} alt="modelo de transparência ativa" src="/modelo-transparencia-ativa.png" />
            </Reveal>
        </section>
    )
}
