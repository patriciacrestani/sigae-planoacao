import { Escola } from "./escola";
import { Melhoria } from "./melhoria";
import { Status } from "./status";


export interface IPlanoAcao {
    id: number;
    titulo: string;
    descricao?: string;
    dataInicio: Date;
    dataFim: Date;
    status: Status;
    melhorias?: Melhoria[];
}

export class PlanoAcao {
    id: number;
    titulo: string;
    descricao?: string;
    dataInicio: Date;
    dataFim: Date;
    escola: Escola;
    status: Status;
    melhorias?: Melhoria[];

    constructor(plano?) {
        if(!plano) {
            return;
        }
        this.id = plano.id;
        this.titulo = plano.titulo;
        this.descricao = plano.descricao;
        this.escola = plano.escola;
        if(typeof(plano.dataInicio) == 'string')  this.dataInicio = new Date(plano.dataInicio);
        else this.dataInicio = plano.dataInicio;
        
        if(typeof(plano.dataFim) == 'string')  this.dataFim = new Date(plano.dataFim);
        else this.dataFim = plano.dataFim;

        this.status = new Status(plano.status);
        this.mapeiaMelhorias(plano.melhorias);
    }

    get possuiMelhorias(): boolean {
        return (!!this.melhorias && this.melhorias.length > 0);
    }

    mapeiaDadosBasicos(dadosBasicos) {
        this.titulo = dadosBasicos["titulo"];
        this.descricao = dadosBasicos["descricao"];
        this.dataInicio = dadosBasicos["dataInicio"];
        this.dataFim = dadosBasicos["dataFim"];
        this.status = dadosBasicos["status"];
    }

    mapeiaMelhorias(melhorias) {
        if(!!melhorias && melhorias.length > 0) this.melhorias = melhorias.map(melhoria => new Melhoria(melhoria));
    }

    excluirMelhoria(idMelhoria) {
        let indexMelhoria = this.melhorias?.findIndex(melhoria => melhoria.id == idMelhoria);
        if(!!indexMelhoria && indexMelhoria != -1) {
            this.melhorias = this.melhorias?.splice(indexMelhoria, 1);
        }
    }
}