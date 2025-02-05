import { Meta } from "./meta";
import { Status } from "./status";

export class PlanoAcao {
    id: number;
    titulo: string;
    descricao?: string;
    dataInicio: string;
    dataFim: string;
    status: Status;
    metas?: Meta[];
}