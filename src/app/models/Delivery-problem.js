import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
    static init(sequelize) {
        super.init(
            {
                delivery_id: Sequelize.INTEGER,
                description: Sequelize.STRING,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );

        return this;
    }
}

export default DeliveryProblem;
