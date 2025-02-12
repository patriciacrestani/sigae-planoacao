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
                }
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
                "status": {
                    "id": 1,
                    "descricao": "Em progresso"
                },
                "melhorias": []
            },
            { status: 200 }
        );
    }),
];