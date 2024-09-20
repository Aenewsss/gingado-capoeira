'use client'
import Navbar from "../components/Navbar";

export default function Page() {
    return (
        <main>
            <Navbar />
            <br />
            <iframe className="mt-5 h-screen w-full"
                src=
                "/modelo-transparencia-ativa.pdf"
                width="800" height="500">
            </iframe>
        </main>
    )
}