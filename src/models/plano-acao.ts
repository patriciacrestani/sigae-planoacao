import { Meta } from "./meta";
import { Status } from "./status";


export interface IPlanoAcao {
    id: number;
    titulo: string;
    descricao?: string;
    dataInicio: string;
    dataFim: string;
    status: Status;
    metas?: Meta[];
}

export class PlanoAcao {
    id: number;
    titulo: string;
    descricao?: string;
    dataInicio: string;
    dataFim: string;
    status: Status;
    metas?: Meta[];

    mapeiaDadosBasicos(dadosBasicos) {
        this.titulo = dadosBasicos["titulo"];
        this.descricao = dadosBasicos["descricao"];
        this.dataInicio = dadosBasicos["dataInicio"];
        this.dataFim = dadosBasicos["dataFim"];
        this.status = dadosBasicos["status"];
    }
}