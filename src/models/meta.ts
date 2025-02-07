import { Acao } from "./acao";

export interface IMeta {
    id: number;
    titulo: string;
    acoes: Acao[];

    get indPossuiAcoes(): boolean;
}

export class Meta implements IMeta {
    id: number;
    titulo: string;
    acoes: Acao[];

    get indPossuiAcoes(): boolean {
        return (!!this.acoes && this.acoes.length > 0);
    }

    constructor(meta) {
        this.id = meta["id"];
        this.titulo = meta["titulo"];
        if(!!meta["acoes"] && meta["acoes"].length > 0) {
            this.acoes = meta["acoes"];
        } else {
            this.acoes = [];
        }

    }
}