/**
 * Faixas dos álbuns do YouTube Music tocadas no player flutuante.
 * Fonte: music.youtube.com/playlist?list=<id> (lista copiada da página do álbum).
 */
export interface Faixa {
    videoId: string
    titulo: string
}

export interface Album {
    id: string
    titulo: string
    faixas: Faixa[]
}

export const ALBUNS: Album[] = [
    {
        id: "OLAK5uy_mAFGHojj0YHLXmv3CRzI7g-EsJYRo8bns",
        titulo: "Grupo Gingado Capoeira",
        faixas: [
            { videoId: "FtpJO2kklFg", titulo: "Rasteira Maré" },
            { videoId: "JXUlgh1Zpts", titulo: "Tem Que Ter Dendê" },
            { videoId: "gP-zJV9wk3s", titulo: "Balanço da Maré" },
            { videoId: "JWmEVvFh2-I", titulo: "Meu Berimbau Tocou" },
            { videoId: "baDHsCyOgAk", titulo: "Bahia Manda Seu Axé" },
            { videoId: "wgBkUv3CKFk", titulo: "Toda Roda é Bahia" },
            { videoId: "T_xIDiwosCo", titulo: "Mataram o Besouro" },
            { videoId: "1pNW6M5cbIY", titulo: "O Gunga Tocava Sereno" },
            { videoId: "tNAvIt2XqWg", titulo: "Ele é Mestre dos Mestres" },
            { videoId: "aYp_Tc2DAF8", titulo: "Um Negro da Bahia" },
            { videoId: "FgV1LdoUhK4", titulo: "Me Leva Que Eu Vou" },
            { videoId: "709GyFUqnks", titulo: "Peço Pra Deus Ajudar" },
            { videoId: "T919HWXj2vU", titulo: "Bahia de Todos Os Santos" },
            { videoId: "qBWIG88IFQc", titulo: "O Que Eu Procurava" },
            { videoId: "NhNleHgFvEk", titulo: "Visão do Clima" },
            { videoId: "10HDOAEX-dI", titulo: "Rod de Capoeiragem" },
            { videoId: "PQDHT0mwIJ4", titulo: "Na Roda Menina é Capoeira" },
            { videoId: "0nU9rjf-WAw", titulo: "Negro Veio de Guiné" },
            { videoId: "moSJKCReOYQ", titulo: "Me Leva Eh! Berimbau Me Leva" },
            { videoId: "jM2FpuHO6yE", titulo: "Mata" },
            { videoId: "XLfZ_m-OVF4", titulo: "Se Não é Dia de Ir Lá" },
            { videoId: "tSLMQrQoFaA", titulo: "Chama Aidè" },
            { videoId: "fZbGQVA9tF8", titulo: "Puxa Mulato" },
            { videoId: "TBh-8ttfnrg", titulo: "é Na Roda Que Eu Quero Ver" },
            { videoId: "12B0HOoV81g", titulo: "Serpenteando Leva e Traz" },
            { videoId: "jiWP-XE-BgY", titulo: "Extra" },
        ],
    },
    {
        id: "OLAK5uy_lHW8DB3nJG6CZRjoTbxVsSpnPeX2-ayrg",
        titulo: "Malandragem",
        faixas: [
            { videoId: "6rQ24RCqiSM", titulo: "Ô Meu Deus" },
            { videoId: "ER4DlP2A_aE", titulo: "Malandragem" },
            { videoId: "tOc191QIfzg", titulo: "Quem Vem La" },
            { videoId: "FCgBG8MkzwY", titulo: "Filhos Mestiço" },
            { videoId: "WOBtRpUb7ew", titulo: "Preto Velho" },
            { videoId: "d5sIkLP8_XY", titulo: "Jornada" },
            { videoId: "Yq8Brvz7gAw", titulo: "Eu Vou Girar" },
            { videoId: "Z6wZcdeY4cs", titulo: "Saudades Camera" },
            { videoId: "kEmo9r8rAwM", titulo: "Vou Me Embora Ou Desembola" },
            { videoId: "eoOMAhmMbJU", titulo: "Capoeira Me Ensinou" },
            { videoId: "YNy8FvLvb6I", titulo: "É De Rua" },
            { videoId: "Z9af8fHyf6I", titulo: "O Mestre Dos Mestres" },
            { videoId: "ZHOLVD7fHiQ", titulo: "Adeus Morena Adeus" },
            { videoId: "oi929aKSAXc", titulo: "O Meu Mestre Quer Ver Vc Balançar" },
            { videoId: "4OTaCy8umyQ", titulo: "Lei Aurea" },
            { videoId: "iX97kw09jso", titulo: "Maria" },
            { videoId: "i4k9MDzymq8", titulo: "Navio Negreiro" },
            { videoId: "LsE56-covqQ", titulo: "O Brasil Mostra Seu Gingado" },
            { videoId: "IBcVmfETks8", titulo: "Capoeira Voa" },
            { videoId: "wj-dIK4SDN4", titulo: "O Que Diria O Meu Mestre" },
            { videoId: "s8MnXAqQgYI", titulo: "Tropeços" },
            { videoId: "CotvxBbAqb0", titulo: "Ogum Meu Santo Meu Guia" },
            { videoId: "wlQXLfF5Y_c", titulo: "Areia" },
            { videoId: "-om8mnyiigc", titulo: "Valores Reais" },
            { videoId: "H2o8VmLsn_w", titulo: "Nadei" },
            { videoId: "g8kQhJ1czd4", titulo: "Lamento" },
            { videoId: "9uBtAXDJSG8", titulo: "Mandinga Minha" },
            { videoId: "nQqfXHIlkI8", titulo: "O Xodó da Minha Vida" },
        ],
    },
]
