import Image from "next/image";

export default function Gallery() {

    return (
        <section className="pt-20 bg-white flex justify-center flex-col" id="galeria">
            <h2 className="text-4xl lg:text-6xl text-center text-blue-950">Fotos e Vídeos</h2>

            <div className="flex sm:h-screen mt-10 sm:flex-row flex-col">
                <div className="flex flex-col sm:w-1/3 w-full">
                    <Image className="w-full" unoptimized src="/galeria/image1.png" width={500} height={500} alt="Mestre Cristopher realizando salto mortal" />
                    <Image className="w-full h-full object-cover" unoptimized src="/galeria/image2.png" width={500} height={500} alt="Apresentação de Maculelê" />
                </div>
                <Image className="sm:w-1/3 w-full" unoptimized src="/galeria/image3.png" width={500} height={500} alt="Banner Associação Cultural Gingado Capoeira, Mestre Pablo" />
                <div className="flex flex-col sm:w-1/3 w-full">
                    <Image className="h-1/3 w-full object-cover" unoptimized src="/galeria/image4.png" width={500} height={500} alt="Mestre Cristopher e Mestre Simpson jogando capoeira" />
                    <Image className="w-full object-cover h-full" unoptimized src="/galeria/image5.png" width={500} height={500} alt="Cordas de capoeira sendo feitas para troca de graduação" />
                </div>
            </div>
        </section>
    )
}