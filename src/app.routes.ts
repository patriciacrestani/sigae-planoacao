import { Routes } from '@angular/router';
import { ListagemComponent } from './app/pages/listagem/listagem.component';
import { CadastroComponent } from './app/pages/cadastro/cadastro.component';
import { DadosBasicosComponent } from './app/@core/dados-basicos/dados-basicos.component';
import { MelhoriasComponent } from './app/@core/melhorias/melhorias.component';
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
                path: '', 
                pathMatch: 'prefix',
                redirectTo: 'dados-basicos' 
            },
            { 
                path: 'dados-basicos',
                component: DadosBasicosComponent
            },
            { 
                path: 'melhorias',
                component: MelhoriasComponent
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
                path: ':id', 
                pathMatch: 'prefix',
                redirectTo: 'dados-basicos' 
            },
            { 
                path: 'dados-basicos',
                component: DadosBasicosComponent
            },
            { 
                path: 'melhorias',
                component: MelhoriasComponent
            },
            { 
                path: 'acoes',
                component: AcoesComponent
            },
        ]
    },
    { path: '**', redirectTo: '' }
];
