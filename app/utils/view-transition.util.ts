/** View Transitions API com tipos próprios (o lib DOM do TypeScript do projeto ainda não a declara). */
interface ViewTransition {
    finished: Promise<void>
}

type DocumentWithViewTransition = Document & { startViewTransition?: (update: () => void) => ViewTransition }

export function supportsViewTransition() {
    return typeof (document as DocumentWithViewTransition).startViewTransition === "function"
}

export function startViewTransition(update: () => void): Promise<void> {
    const start = (document as DocumentWithViewTransition).startViewTransition
    if (!start) {
        update()
        return Promise.resolve()
    }
    return start.call(document, update).finished
}

export function setViewTransitionName(element: HTMLElement, name: string) {
    element.style.setProperty("view-transition-name", name || null)
}
