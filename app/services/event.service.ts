class EventService {
    async addEvent(file: File) {
        return await (await fetch('http://localhost:3000/api/events',
            {
                method: 'POST',
                body: JSON.stringify(file)
            }
        )).json()
    }
}

export default new EventService()