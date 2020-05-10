module.exports = {
    up: (QueryInterface) => {
        return QueryInterface.bulkInsert(
            'Deliveries',
            [
                {
                    recipient_id: '1',
                    deliveryman_id: '1',
                    product: 'Cremes dona Ivone',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    recipient_id: '1',
                    deliveryman_id: '2',
                    product: 'Camisa balenciaga mode',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    recipient_id: '2',
                    deliveryman_id: '1',
                    product: 'Yeezy boost 350 v2',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    recipient_id: '2',
                    deliveryman_id: '2',
                    product: 'Explossivos c4',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    down: () => {},
};
