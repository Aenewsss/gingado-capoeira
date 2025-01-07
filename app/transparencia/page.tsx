import Image from "next/image";
import Footer from "../components/Footer";
import Example from "../components/Navbar";

export default function Page() {
    return (
        <>
            <Example />


            <h1 className="text-center text-5xl my-10">Transparência | Recursos recebidos</h1>

        
            <section className="flex flex-col h-screen items-center justify-center mb-10">

                <Image className="mb-6" src="/logo-transparencia.jpeg" width={400} height={400} alt="Grupo logo" />

                <object
                    data="/Recursos Recebidos.pdf#&navpanes=0&scrollbar=0"
                    type="application/pdf"
                    width="60%"
                    height="100%"
                    
                >
                    <p>
                        Seu navegador não suporta a visualização de pdfs.
                        <a href="Recursos Recebidos.pdf">Baixar pdf</a>
                        .
                    </p>
                </object>

            </section>

            <Footer />
        </>
    )
}