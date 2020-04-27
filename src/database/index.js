import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User]; // todos models da aplicação
class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig); // inicia conexão

        models.map((model) => model.init(this.connection)); // carrega models
    }
}

export default new Database();
