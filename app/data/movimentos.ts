/**
 * Movimentos que entram no meio da ginga, em public/models/moves/<nome>.glb.
 * Para adicionar um novo: scripts/add-move.sh caminho/do/movimento.fbx nome [mundo]
 *
 * retarget:
 * - "direto" (padrão): copia as rotações dos ossos. Certo para o esqueleto do personagem masculino.
 * - "mundo": converte pelo giro de cada osso no mundo. Necessário para movimentos gravados na personagem
 *   feminina (outro esqueleto), senão o corpo entorta.
 */
export type ModoRetarget = "direto" | "mundo"

export interface Movimento {
    nome: string
    retarget?: ModoRetarget
}

export const MOVIMENTOS: Movimento[] = [
    { nome: "bencao" },
    { nome: "chapa", retarget: "mundo" },
    { nome: "martelo" },
    { nome: "esquiva-lateral", retarget: "mundo" },
    { nome: "meia-lua-frente" },
    { nome: "au", retarget: "mundo" },
    { nome: "quique-cabeca" },
    { nome: "macaco-em-pe" },
    { nome: "armada" },
]
