import Image from "next/image";
import Link from "next/link";

export default function Headquarters() {
    return (
        <section className="pb-20 bg-blue-950 flex flex-col" id="sede">
            <div className="w-full">
                <iframe width="100%" height="600" frameBorder="0" scrolling="no"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Aruc%20Cruzeiro+(Sede%20Gingado%20Capoeira%20)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
            </div>
            <div className="pt-20 flex sm:flex-row flex-col justify-between w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h2 className="text-4xl lg:text-6xl text-center flex gap-4 sm:flex-row flex-col sm:items-start items-center sm:mb-0 mb-4">
                    Nossa sede
                    <Image className="" src="/aruc-logo.png" width={200} height={100} alt="Logo Aruc" />
                </h2>
                <div className=" flex flex-col">
                    <ul className="flex flex-col gap-6">
                        <li>
                            <Link className="flex gap-2 items-center" href="https://www.google.com/maps/place/ARUC/@-15.7863474,-47.9378451,15z/data=!4m6!3m5!1s0x935a308dad555555:0xc1a3e239412e93b8!8m2!3d-15.7863474!4d-47.9378451!16s%2Fg%2F1tdz5x99?entry=ttu">
                                <Image src="/location-icon.svg" width={30} height={30} alt="Ícone localização" />
                                <span>
                                    SRES Área Especial 8 - Cruzeiro Velho, Brasília - DF, 70648-500
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex gap-2 items-center" href="https://www.instagram.com/gingadocapoeira_oficial/">
                                <Image src="/insta-icon.svg" width={30} height={30} alt="Ícone instagram" />
                                <span>
                                    gingadocapoeira_oficial
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link className="flex gap-2 items-center" href="https://www.instagram.com/gingadocapoeira_oficial/">
                                <Image src="/calendar-icon.svg" width={30} height={30} alt="Ícone calendário" />
                                <span>
                                    Segundas e Quartas às 19h30
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

    )
}