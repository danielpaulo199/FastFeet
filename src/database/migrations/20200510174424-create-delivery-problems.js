module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Delivery-problems', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                alowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            delivery_id: {
                type: Sequelize.INTEGER,
                required: true,
                alowNull: false,
                references: { model: 'Deliveries', key: 'id' },
                onUpdate: 'CASCADE',
                onDelelete: 'SET NULL',
            },
            description: {
                type: Sequelize.STRING,
                alowNull: false,
                required: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                alowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                alowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('Delivery-problems');
    },
};
