import Image from "next/image";

export default function Graduation() {
    return (
        <section className="pt-20" id="sistema">
            <div className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl lg:text-6xl text-center">Sistema de Graduação</h2>
            </div>
            <div className="flex flex-col mt-10">
                <div className="flex sm:flex-row flex-col">
                    <Image className="w-full sm:w-2/4" unoptimized src="/sistema-graduacao/infantil-sistema.png" width={500} height={500} alt="Sistema de Graduação Infantil" />
                    <Image className="w-full sm:w-2/4" unoptimized src="/sistema-graduacao/infantil-foto.png" width={500} height={500} alt="Foto Graduação Infantil" />
                </div>
                <hr className="sm:hidden my-10 mx-10"/>
                <div className="flex sm:flex-row flex-col-reverse">
                    <Image className="w-full sm:w-2/4" unoptimized src="/sistema-graduacao/adulto-foto.png" width={500} height={500} alt="Foto Graduação adulto" />
                    <Image className="w-full sm:w-2/4" unoptimized src="/sistema-graduacao/adulto-sistema.png" width={500} height={500} alt="Sistema de Graduação adulto" />
                </div>
            </div>
        </section>
    )
}