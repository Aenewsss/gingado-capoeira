import Image from "next/image";

export default function Events() {
    return (
        <section className="pt-20 bg-white flex justify-center flex-col" id="eventos">
            <h2 className="text-4xl lg:text-6xl text-center text-blue-950">Próximos Eventos</h2>

            <div className="flex my-10 justify-center gap-14 sm:flex-row flex-col sm:px-0 px-4">
                <Image className="w-auto" width={500} height={500} src="/eventos/evento1.png" unoptimized alt="Evento 1" />
                <Image className="w-auto" width={500} height={500} src="/eventos/evento2.png" unoptimized alt="Evento 2" />
            </div>

            <button className="self-center px-2 py-3 rounded border border-blue-950 text-blue-950 hover:bg-blue-950 hover:text-white transition-all">Ver Todos os Eventos</button>
            
        </section>
    )
}