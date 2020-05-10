module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.bulkInsert(
            'Files',
            [
                {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
