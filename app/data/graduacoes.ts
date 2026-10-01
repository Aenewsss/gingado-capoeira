export const CORES = {
    crua: "#f7f6f2",
    amarela: "#f6c81b",
    laranja: "#f2780f",
    azul: "#1f3596",
    verde: "#1d7a3c",
    roxa: "#8a3aa6",
    marrom: "#7a4a24",
    vermelha: "#d61f1f",
    cinza: "#b7bbc1",
} as const

export type Cor = keyof typeof CORES

export interface Graduacao {
    nome: string
    /** Cor da corda (1 = uma cor só, 2 = bicolor: metade da corda de cada cor). */
    cordas: Cor[]
    /** Ponteiras das duas pontas (infantil). null = ponta sem ponteira. */
    ponteiras?: [Cor | null, Cor | null]
    categoria?: string
    observacao?: string
}

export const GRADUACOES_INFANTIL: Graduacao[] = [
    { nome: "Corda crua", cordas: ["crua"] },
    { nome: "Ponteira amarela", cordas: ["crua"], ponteiras: ["amarela", null] },
    { nome: "2 ponteiras amarelas", cordas: ["crua"], ponteiras: ["amarela", "amarela"] },
    { nome: "Ponteira laranja", cordas: ["crua"], ponteiras: ["laranja", null] },
    { nome: "Ponteiras amarela/laranja", cordas: ["crua"], ponteiras: ["amarela", "laranja"] },
    { nome: "2 ponteiras laranjas", cordas: ["crua"], ponteiras: ["laranja", "laranja"] },
    { nome: "Ponteira azul", cordas: ["crua"], ponteiras: ["azul", null] },
    { nome: "Ponteiras amarela/azul", cordas: ["crua"], ponteiras: ["amarela", "azul"] },
    { nome: "Ponteiras laranja/azul", cordas: ["crua"], ponteiras: ["laranja", "azul"] },
    { nome: "2 ponteiras azuis", cordas: ["crua"], ponteiras: ["azul", "azul"], observacao: "11 anos" },
]

export const GRADUACOES_ADULTO: Graduacao[] = [
    { nome: "Corda crua", cordas: ["crua"], categoria: "Iniciante" },
    { nome: "Crua/amarela", cordas: ["crua", "amarela"], categoria: "Alunos" },
    { nome: "Amarela", cordas: ["amarela"], categoria: "Alunos" },
    { nome: "Crua/laranja", cordas: ["crua", "laranja"], categoria: "Alunos" },
    { nome: "Amarela/laranja", cordas: ["amarela", "laranja"], categoria: "Alunos" },
    { nome: "Laranja", cordas: ["laranja"], categoria: "Alunos" },
    { nome: "Crua/azul", cordas: ["crua", "azul"], categoria: "Alunos" },
    { nome: "Amarela/azul", cordas: ["amarela", "azul"], categoria: "Alunos" },
    { nome: "Laranja/azul", cordas: ["laranja", "azul"], categoria: "Alunos" },
    { nome: "Estagiário", cordas: ["cinza"], categoria: "Estagiário" },
    { nome: "Azul", cordas: ["azul"], categoria: "Graduados" },
    { nome: "Azul/verde", cordas: ["azul", "verde"], categoria: "Graduados" },
    { nome: "Verde", cordas: ["verde"], categoria: "Graduados" },
    { nome: "Verde/roxa", cordas: ["verde", "roxa"], categoria: "Graduados" },
    { nome: "Roxa", cordas: ["roxa"], categoria: "Instrutores" },
    { nome: "Roxa/marrom", cordas: ["roxa", "marrom"], categoria: "Instrutores" },
    { nome: "Marrom", cordas: ["marrom"], categoria: "Professor" },
    { nome: "Marrom/vermelha", cordas: ["marrom", "vermelha"], categoria: "Mestrando" },
    { nome: "Vermelha", cordas: ["vermelha"], categoria: "Mestre" },
]
