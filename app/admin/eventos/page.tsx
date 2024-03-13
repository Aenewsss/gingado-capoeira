import AddEvent from "@/app/components/AddEvent"
export default async function Events() {

    const { events } = await (await fetch('http://localhost:3000/api/events')).json()

    return (
        <main className="mt-10 flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl">Eventos Gingado Capoeira</h1>

            <div className="px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-wrap gap-10 w-full">
                <AddEvent />
                {!events && <p className="mt-10 h-full flex self-center text-red-500 text-2xl w-1/2 justify-center">Nenhum evento adicionado</p>}
            </div>
        </main >
    )
}