import { Pessoa } from "./pessoa";

export class Acao {
    id: number;
    descricao: string;
    dataInicioPrevisto: string;
    dataFimPrevisto: string;
    responsavel: Pessoa;

    constructor(acao?) {
        if(!acao) return;
        this.id = acao.id ? acao.id : 0;
        this.descricao = acao.descricao ? acao.descricao : 0;
        this.dataInicioPrevisto = acao.dataInicioPrevisto ? acao.dataInicioPrevisto : 0;
        this.dataFimPrevisto = acao.dataFimPrevisto ? acao.dataFimPrevisto : 0;
        this.responsavel = acao.responsavel ? acao.responsavel : 0;
    }
}