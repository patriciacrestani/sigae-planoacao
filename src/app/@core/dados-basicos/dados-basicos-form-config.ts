export const dadosBasicosFormConfig = {
    labels: {
        titulo: "Título",
        descricao: "Descrição",
        dataInicio: "Data de inicio",
        dataFim: "Data de término",
        status: "Status"
    },
    placeholders: {
        titulo: "Digite o título",
        descricao: "Digite uma descrição",
        dataInicio: "DD/MM/AAAA",
        dataFim: "DD/MM/AAAA",
        status: "Selecione o status"
    },
    maxLengths: {
        // curto: 100,
        // padrao: 255,
        // longo: 500
        
        titulo: 100,
        descricao: 255
    },
    minLengths: {
        titulo: 10,
        descricao: 10
        // padrao: 50,
        // curto: 10
    }
};