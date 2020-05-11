import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';
import File from '../app/models/File';
import DeliveryProblem from '../app/models/DeliveryProblem';

const models = [User, Recipient, File, Deliveryman, Delivery, DeliveryProblem]; // todos models da aplicação
class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig); // inicia conexão

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
