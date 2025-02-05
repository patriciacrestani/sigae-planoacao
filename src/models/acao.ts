import { Pessoa } from "./pessoa";

export class Acao {
    id: number;
    descricao: string;
    dataInicioPrevisto: string;
    dataFimPrevisto: string;
    responsavel: Pessoa;
}