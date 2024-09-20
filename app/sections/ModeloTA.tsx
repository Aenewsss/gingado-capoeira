import Image from "next/image";

export default function ModeloTA() {
    return (
        <section className="py-10 pt-20 bg-white flex justify-center flex-col items-center gap-4">
            <h2 className="text-4xl lg:text-6xl text-center text-blue-950">Modelo de Transparência Ativa</h2>

            <Image className="" width={600} height={300} alt="modelo de transparência ativa" src="/modelo-transparencia-ativa.png" />
        </section>
    )
}