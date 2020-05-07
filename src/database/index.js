import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';

const models = [User, Recipient, Deliveryman, Delivery]; // todos models da aplicação
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
