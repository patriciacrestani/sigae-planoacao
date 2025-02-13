import { http, HttpResponse } from 'msw';

export const PlanoAcaoMock = [
    http.get('https://example.com/plano-acao', () => {
        return HttpResponse.json(
            [
                {
                    "id": 1,
                    "titulo": "Plano Um",
                    "dataInicio": "2024-06-01",
                    "dataFim": "2025-04-01",
                    "status": {
                        "id": 1,
                        "descricao": "Em progresso"
                    }
                },
                {
                    "id": 2,
                    "titulo": "Plano Completo",
                    "dataInicio": "2024-06-01",
                    "dataFim": "2025-04-01",
                    "status": {
                        "id": 1,
                        "descricao": "Em progresso"
                    },
                },
            ],
            { status: 200 }
        );
    }),

    http.get('https://example.com/plano-acao/1', () => {
        return HttpResponse.json(
            {
                "id": 1,
                "titulo": "Plano Um",
                "dataInicio": "2024-06-01",
                "dataFim": "2025-04-01",
                "descricao": "Descrição de teste.",
                "status": {
                    "id": 1,
                    "descricao": "Em progresso"
                },
                "melhorias": [
                    {
                        "id": 1,
                        "titulo": "Melhoria teste",
                        "acoes": []
                    }
                ]
            },
            { status: 200 }
        );
    }),

    http.get('https://example.com/plano-acao/2', () => {
        return HttpResponse.json(
            {
                "id": 2,
                "titulo": "Plano Completo",
                "dataInicio": "2024-06-01",
                "dataFim": "2025-04-01",
                "descricao": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam blandit leo a justo porttitor pharetra. Quisque sollicitudin nisi libero, ac.",
                "status": {
                    "id": 1,
                    "descricao": "Em progresso"
                },
                "melhorias": [
                    {
                        "id": 1,
                        "titulo": "Melhoria Um",
                        "acoes": []
                    }
                ]
            },
            { status: 200 }
        );
    }),

    http.delete('https://example.com/plano-acao/1', () => {
        return HttpResponse.json(
            { status: 200 }
        );
    }),
    
    http.delete('https://example.com/plano-acao/2', () => {
        return HttpResponse.json(
            { status: 200 }
        );
    }),
];