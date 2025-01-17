module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Deliveries', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Recipients', key: 'id' },
                onUpdate: 'CASCADE',
                onDelelete: 'SET NULL',
            },
            deliveryman_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'Deliverymans', key: 'id' },
                onUpdate: 'CASCADE',
                onDelelete: 'SET NULL',
            },
            signature_id: {
                type: Sequelize.INTEGER,
                references: { model: 'Files', key: 'id' },
                onUpdate: 'CASCADE',
                onDelelete: 'SET NULL',
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('Deliveries');
    },
};
