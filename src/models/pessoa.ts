import { Escola } from "./escola";

export class Pessoa {
    id: number;
    nome: string;
    escola: Escola;

    constructor(pessoa) {
        if(!pessoa) return;
        this.id = pessoa.id;
        this.nome = pessoa.nome;
        this.escola = pessoa.escola;
    }
}