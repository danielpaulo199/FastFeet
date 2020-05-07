module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.bulkInsert(
            'Deliverymans',
            [
                {
                    name: 'sedex',
                    email: 'sedex10@sedex.com.br',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: 'Trans Paula',
                    email: 'transpaula@bool.com',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
