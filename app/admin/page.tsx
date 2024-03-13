import Image from "next/image";
import Link from "next/link";

export default function Admin() {
    return (
        <main className="h-screen flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl">Área do Administrador</h1>

            <div className="flex flex-wrap gap-10">
                <Link href="/admin/eventos" className="max-w-96 pb-8 rounded bg-blue-950 flex flex-col gap-6 hover:scale-105 hover:transition-all">
                    <Image className="object-cover h-56" unoptimized width={500} height={500} src="/admin-eventos.jpeg" alt="Banner Galeria" />
                    <div className="px-6">
                        <h2 className="text-2xl font-medium">Eventos Gingado Capoeira</h2>
                        <p className="font-light mt-4">Gerencie, promova e mantenha atualizados os eventos do Gingado Capoeira. Adicione, edite e exclua eventos facilmente.</p>
                    </div>
                </Link>
                <Link href="/admin/galeria" className="max-w-96 pb-8 rounded bg-blue-950 flex flex-col gap-6 hover:scale-105 hover:transition-all">
                    <Image className="object-cover h-56" unoptimized width={500} height={500} src="/admin-galeria.jpg" alt="Banner Galeria" />
                    <div className="px-6">
                        <h2 className="text-2xl font-medium">Galeria de Fotos e Vídeos</h2>
                        <p className="font-light mt-4">Compartilhe os momentos mais memoráveis do Gingado Capoeira. Faça upload de fotos e vídeos e mantenha a comunidade inspirada.</p>
                    </div>
                </Link>
            </div>
            <Image className="absolute top-auto opacity-20 w-1/2 -z-10" src="/favicon.svg" width={500} height={500} alt="Logo" />
        </main>
    )
}