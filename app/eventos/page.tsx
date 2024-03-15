import Image from "next/image";
import Top from "../sections/Top";
import { isVideo } from "../utils/is-video.util";
import { resolveImagePath } from "../utils/resolve-image-path.util";
import { TypeImageEnum } from "../enums/type-image.enum";
import getEvents from "../actions/get-events.action";
import Footer from "../components/Footer";

export default async function Gallery() {

    const { events, message } = await getEvents()

    return (
        <main>
            <Top onlyShowNavbar={true} />

            <h1 className="my-10 text-5xl text-center">Eventos Gingado Capoeira</h1>

            <section className=" px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap gap-10 justify-center">
                {
                    events.map((event, index) =>
                        <Image key={index} className="w-auto" width={500} height={500} src={resolveImagePath(event, TypeImageEnum.EVENT)} unoptimized alt="Evento 1" />
                    )
                }
            </section>

            <div className="mt-20"></div>
            <Footer />

        </main>
    )
}