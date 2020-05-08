import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';

class DeliverymanAccessController {
    async index(req, res) {
        const { id } = req.params;

        const deliveryman = await Deliveryman.findByPk(id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        const deliveries = await Delivery.findAll({
            where: { deliveryman_id: id, canceled_at: null, end_date: null },
            order: [['id', 'ASC']],
        });

        if (deliveries.length === 0) {
            return res
                .status(200)
                .json({ message: 'There are no deliveries left' });
        }

        return res.status(200).json({ deliveries });
    }

    async show(req, res) {
        const { id } = req.params;

        const deliveryman = await Deliveryman.findByPk(id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        const deliveries = await Delivery.findAll({
            where: {
                deliveryman_id: id,
                end_date: { [Op.not]: null },
                canceled_at: null,
            },
            order: [['id', 'ASC']],
        });

        if (!deliveries) {
            return res
                .status(200)
                .json({ message: 'There are no deliveries left' });
        }

        return res.status(200).json({ deliveries });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            start_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations Failed' });
        }

        const { id, delivery } = req.params;

        const deliveryman = await Deliveryman.findByPk(id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        const dbDelivery = await Delivery.findByPk(delivery);
        if (!dbDelivery) {
            return res.status(400).json({ error: 'Delivery not exists' });
        }

        req.body.start_date = new Date();

        const updatedDelivery = await dbDelivery.update(req.body);

        return res.status(200).json({ updatedDelivery });
    }
}

export default new DeliverymanAccessController();
