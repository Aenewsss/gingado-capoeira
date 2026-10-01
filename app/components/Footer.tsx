import Image from "next/image";
import Link from "next/link";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import InstagramIcon from "./InstagramIcon";
import { CONTATO } from "../data/contato";

/** Links com "/" na frente: o rodapé também aparece nas páginas internas (galeria, eventos, transparência). */
const NAVEGACAO = [
    { nome: "Gingado Capoeira", href: "/#sobre" },
    { nome: "Graduação", href: "/#sistema" },
    { nome: "Eventos", href: "/#eventos" },
    { nome: "Galeria", href: "/#galeria" },
    { nome: "Nossa sede", href: "/#sede" },
    { nome: "Transparência", href: "/transparencia" },
]

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#070d24] text-white">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
                <div className="grid gap-12 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <Image width={52} height={52} src="/favicon.svg" alt="Logo Gingado Capoeira" />
                            <span className="text-xl leading-tight">Associação Cultural<br /><strong>Gingado Capoeira</strong></span>
                        </Link>
                        <p className="mt-6 max-w-md text-white/60 font-light leading-7">
                            Desde 2006 desenvolvendo a capoeira como arte, cultura, luta e filosofia de vida. Mestre Pablo, in memoriam.
                        </p>
                        <Link href={CONTATO.instagramUrl} target="_blank" aria-label="Instagram da Gingado Capoeira" className="mt-6 inline-flex w-11 h-11 items-center justify-center rounded-full ring-1 ring-white/20 hover:bg-red-600 hover:ring-red-600 transition-colors">
                            <InstagramIcon />
                        </Link>
                    </div>

                    <nav aria-label="Rodapé">
                        <p className="text-xs tracking-[0.25em] uppercase text-amber-300">Navegação</p>
                        <ul className="mt-5 flex flex-col gap-3">
                            {NAVEGACAO.map(item =>
                                <li key={item.href}>
                                    <Link href={item.href} className="text-white/75 hover:text-white transition-colors">{item.nome}</Link>
                                </li>
                            )}
                        </ul>
                    </nav>

                    <div>
                        <p className="text-xs tracking-[0.25em] uppercase text-amber-300">Treinos</p>
                        <ul className="mt-5 flex flex-col gap-4 text-white/75">
                            <li className="flex gap-3"><CalendarDaysIcon className="w-5 h-5 shrink-0 text-white/40" /> {CONTATO.treinos}</li>
                            <li>
                                <Link href={CONTATO.mapaUrl} target="_blank" className="flex gap-3 hover:text-white transition-colors">
                                    <MapPinIcon className="w-5 h-5 shrink-0 text-white/40" /> {CONTATO.endereco}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <p aria-hidden="true" className="mt-16 select-none text-[18vw] lg:text-[11rem] font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.12)] text-center">
                    GINGADO
                </p>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-sm text-white/50">
                    <p>© {new Date().getFullYear()} Associação Cultural Gingado Capoeira. Todos os direitos reservados.</p>
                    <Link target="_blank" href="https://aenamartinelli.com.br" className="hover:text-white transition-colors">Site por aenamartinelli.com.br</Link>
                </div>
            </div>
        </footer>
    )
}
