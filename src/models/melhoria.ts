import { Acao } from "./acao";

export interface IMelhoria {
    id: number;
    titulo: string;
    acoes: Acao[];

    get indPossuiAcoes(): boolean;
}

export class Melhoria implements IMelhoria {
    id: number;
    titulo: string;
    acoes: Acao[];

    get indPossuiAcoes(): boolean {
        return (!!this.acoes && this.acoes.length > 0);
    }

    constructor(melhoria) {
        this.id = melhoria["id"];
        this.titulo = melhoria["titulo"];
        if(!!melhoria["acoes"] && melhoria["acoes"].length > 0) {
            this.acoes = melhoria["acoes"];
        } else {
            this.acoes = [];
        }

    }
}