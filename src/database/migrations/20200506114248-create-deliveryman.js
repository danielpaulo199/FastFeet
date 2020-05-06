module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Deliverymans', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                alowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                required: true,
                alowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                required: true,
                alowNull: false,
            },
            avatar_id: {
                type: Sequelize.INTEGER,
                unique: true,
                autoIncrement: true,
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
        return queryInterface.dropTable('Deliverymans');
    },
};
