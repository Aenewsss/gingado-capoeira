import Image from "next/image";

export default function About() {
    return (
        <section className="relative" id="sobre">
            <div className="flex">
                <div className="w-2/4 hidden lg:block">
                </div>
                <Image className="lg:relative absolute bottom-0 w-full lg:w-2/4" unoptimized src="/foto-quem-somos.png" width={500} height={500} alt="Foto jogo de capoeira, Sobre A Associação Cultural Gingado Capoeira" />
            </div>
            <div className="pt-10 lg:pt-20 w-full top-0 z-10 relative lg:absolute">
                <div className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <h1 className="text-4xl lg:text-6xl">Associação Cultural Gingado Capoeira</h1>
                    <p className="text-base lg:text-lg mt-6 font-light leading-7">
                        A Associação Cultural Gingado Capoeira, foi fundada no dia 13 de setembro de 2006, na cidade de Brasilia-DF, tendo como fundador, Pablo Balduino de Magalhães (Mestre Pablo).
                        <br />
                        Nossa proposta é desenvolver a capoeira como um todo, buscar um padrão na metodologia de ensino e prática de várias modalidades que compõem a capoeira como arte, cultura, desporto, profissão e filosofia de vida.
                        <br />
                        Todavia, nossa principal proposta é a capoeira como luta, resgatar a valorização pelo verdadeiro Mestre de Capoeira, mas, acima de tudo, mostrar que o capoeirista é um atleta, um poeta, um divulgador de uma arte totalmente brasileira.
                    </p>
                </div>
            </div>
        </section>
    )
}