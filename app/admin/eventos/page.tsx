import getEvents from "@/app/actions/get-events.action"
import AddEvent from "@/app/components/AddEvent"
import EventsList from "@/app/components/EventsList"
import Link from "next/link"
export default async function Events() {

    const { events, message } = await getEvents()

    return (
        <main className="my-10 flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl">Eventos Gingado Capoeira</h1>

            <div className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap gap-4 w-full">
                <AddEvent />
                {
                    !events.length
                        ? <p className="mt-10 h-full flex self-center text-red-500 text-2xl w-1/2 justify-center">{message}</p>
                        : <EventsList events={events} />
                }
            </div>
            <Link className="absolute top-0 left-10" href="/admin">← Voltar</Link>
        </main >
    )
}