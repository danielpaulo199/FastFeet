module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.bulkInsert(
            'Deliveries',
            [
                {
                    name: '',
                    path: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: '',
                    path: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: '',
                    path: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    name: '',
                    path: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
