module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Recipients', {
            id: {
                type: Sequelize.INTEGER,
                alowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            rua: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            numero: {
                type: Sequelize.INTEGER,
                alowNull: false,
            },
            complemento: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            estado: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            cidade: {
                type: Sequelize.STRING,
                alowNull: false,
            },
            cep: {
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
        return queryInterface.dropTable('Recipients');
    },
};
