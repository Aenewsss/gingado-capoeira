import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Top() {
    return (
        <section>
            <Navbar />
            <div className="relative">
                <Image unoptimized className="w-full" width={500} height={500} src="/foto-topo.png" alt="Foto topo, Roda de capoeira" />
                <div className=" px-2 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
                <p className="absolute bottom-10 sm:bottom-20 text-2xl sm:text-5xl">“O orgulho divide os homens, a humildade os une”</p>
                </div>
            </div>
        </section>
    )
}