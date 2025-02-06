export class Status { 
    id: number;
    descricao: string;

    constructor(status) {
        this.id = status["id"];
        this.descricao = status["descricao"];
    }
}