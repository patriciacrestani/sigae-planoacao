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

    get possuiMetas(): boolean {
        return (!!this.metas && this.metas.length > 0);
    }

    mapeiaDadosBasicos(dadosBasicos) {
        this.titulo = dadosBasicos["titulo"];
        this.descricao = dadosBasicos["descricao"];
        this.dataInicio = dadosBasicos["dataInicio"];
        this.dataFim = dadosBasicos["dataFim"];
        this.status = dadosBasicos["status"];
    }

    mapeiaMetas(metas) {
        this.metas = metas.map(meta => new Meta(meta));
    }

    excluirMeta(idMeta) {
        let indexMeta = this.metas?.findIndex(meta => meta.id == idMeta);
        if(!!indexMeta && indexMeta != -1) {
            this.metas = this.metas?.splice(indexMeta, 1);
        }
    }
}