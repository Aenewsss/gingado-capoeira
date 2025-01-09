import Image from "next/image";
import Footer from "../components/Footer";
import Example from "../components/Navbar";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <Example />


            <h1 className="text-center md:text-5xl text-3xl my-10 px-4">Transparência | Recursos recebidos</h1>

        
            <section className="flex flex-col items-center justify-center mb-10">

                <Image unoptimized quality={100} className="mb-6 md:w-auto w-full" src="/logo-transparencia.jpeg" width={400} height={400} alt="Grupo logo" />
                <Image unoptimized quality={100} className="mb-6 w-full md:w-3/4" src="/192.jpeg" width={400} height={300} alt="Grupo logo" />
                <Image unoptimized quality={100} className="mb-6 w-full md:w-3/4" src="/300.jpeg" width={400} height={300} alt="Grupo logo" />

                <Link className="text-xl mt-4 px-4 text-center text-blue-500" href="/gingado-capoeira.xlsx" download>Clicar e fazer o download da planilha</Link>

            </section>

            <Footer />
        </>
    )
}