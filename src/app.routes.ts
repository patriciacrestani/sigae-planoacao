import { Routes } from '@angular/router';
import { ListagemComponent } from './app/pages/listagem/listagem.component';
import { CadastroComponent } from './app/pages/cadastro/cadastro.component';
import { DadosBasicosComponent } from './app/@core/dados-basicos/dados-basicos.component';
import { MetasComponent } from './app/@core/metas/metas.component';
import { AcoesComponent } from './app/@core/acoes/acoes.component';

export const appRoutes: Routes = [
    { 
        path: '', 
        component: ListagemComponent 
    },
    { 
        path: 'cadastro', 
        component: CadastroComponent,
        children: [
            { 
                path: 'dados-basicos',
                component: DadosBasicosComponent
            },
            { 
                path: 'metas',
                component: MetasComponent
            },
            { 
                path: 'acoes',
                component: AcoesComponent
            },
        ]
    },
    { 
        path: 'edicao/:id', 
        component: CadastroComponent,
        children: [
            { 
                path: 'dados-basicos',
                component: DadosBasicosComponent
            },
            { 
                path: 'metas',
                component: MetasComponent
            },
            { 
                path: 'acoes',
                component: AcoesComponent
            },
        ]
    },
    { path: '**', redirectTo: '' }
];
