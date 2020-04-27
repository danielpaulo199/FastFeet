module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                alowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                alowNull: false,
                unique: true,
            },
            password_hash: {
                type: Sequelize.STRING,
                alowNull: false,
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
        return queryInterface.dropTable('Users');
    },
};
