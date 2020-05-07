module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.bulkInsert(
            'Recipients',
            [
                {
                    name: 'Daniel Paulo',
                    rua: 'São Miguel do Oeste',
                    numero: 473,
                    complemento: 'D',
                    estado: 'Santa Catarina',
                    cidade: 'Chapecó',
                    cep: '89809-550',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Jose Pinguelo',
                    rua: 'Curruira',
                    numero: 400,
                    complemento: 'D',
                    estado: 'Santa Catarina',
                    cidade: 'Chapecó',
                    cep: '89809-551',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
