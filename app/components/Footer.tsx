import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-20">
            <div className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="flex justify-center sm:justify-between items-center flex-wrap">
                    <Link href="/"><Image width={60} height={60} src="/favicon.svg" alt="Logo" /></Link>
                    <ul className="flex gap-4 items-center flex-wrap sm:mt-0 mt-10 justify-center">
                        <li className="hover:font-medium"><Link href="#sobre">Gingado Capoeira</Link></li>
                        <li className="hover:font-medium"><Link href="#sistema">Graduação</Link></li>
                        <li className="hover:font-medium"><Link href="#eventos">Eventos</Link></li>
                        <li className="hover:font-medium"><Link href="#galeria">Galeria</Link></li>
                        <li className="px-3 py-2 rounded-md bg-white text-black hover:font-medium hover:scale-105"><Link href="#sede">Nossa Sede</Link></li>
                    </ul>
                </div>
                <p className="pt-20 font-light text-center">
                    <Link target="_blank" href="https://aenamartinelli.com.br">
                        Copyright © 2024 All rights reserved | Site desenvolvido por aenamartinelli.com.br
                    </Link>
                </p>
            </div>
        </footer>
    )
}