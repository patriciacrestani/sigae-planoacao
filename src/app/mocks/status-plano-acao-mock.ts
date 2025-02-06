import { http, HttpResponse } from 'msw';

export const StatusPlanoAcaoMock = [
    http.get('https://example.com/plano-acao/status', () => {
        return HttpResponse.json(
            [
                {
                    "id": 1,
                    "descricao": "Em progresso"
                },
                {
                    "id": 2,
                    "descricao": "Concluído"
                }
            ],
            { status: 200 }
        );
    }),
];