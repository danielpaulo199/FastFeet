module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Deliverymans', 'avatar_id', {
            type: Sequelize.INTEGER,
            references: { model: 'Files', key: 'id' },
            onUpdate: 'CASCADE',
            onDelelete: 'SET NULL',
            alowNull: true,
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Deliverymans', 'avatar_id');
    },
};
