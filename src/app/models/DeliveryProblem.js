import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
    static init(sequelize) {
        super.init(
            {
                delivery_id: Sequelize.INTEGER,
                description: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Delivery, {
            foreignKey: 'delivery_id',
            as: 'delivery',
        });
    }
}

export default DeliveryProblem;
