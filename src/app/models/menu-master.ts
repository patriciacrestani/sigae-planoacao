import { Escola } from "./escola";
import { Pessoa } from "./pessoa";

export class MenuMaster {
    escola: Escola;
    pessoa: Pessoa;

    constructor(dados?) {
        if(!dados) {
            return;
        }
        
        this.escola = dados['escola'];
        this.pessoa = dados['pessoa'];
    }
}