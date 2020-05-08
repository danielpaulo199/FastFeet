import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class DeliveryController {
    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required(),
        });

        // Verificações
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Failed!' });
        }

        const { recipient_id } = req.body;
        const recipient = await Recipient.findByPk(recipient_id);
        if (!recipient) {
            return res.status(400).json({ error: 'Recipient does not exists' });
        }

        const { deliveryman_id } = req.body;
        const deliveryman = await Deliveryman.findByPk(deliveryman_id);
        if (!deliveryman) {
            return res
                .status(400)
                .json({ error: 'Deliveryman does not exists' });
        }

        const delivery = await Delivery.create(req.body);
        return res.status(201).json({ delivery });
    }

    async index(req, res) {
        const deliverys = await Delivery.findAll({ order: [['id', 'ASC']] });
        return res.status(200).json({ deliverys });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            product: Yup.string(),
            canceled_at: Yup.date(),
            signature_id: Yup.number(),
            start_date: Yup.date(),
            end_date: Yup.date(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ erro: 'Validations failed' });
        }

        const deliveryId = req.params.id;
        const delivery = await Delivery.findByPk(deliveryId);
        if (!delivery) {
            return res.status(400).json({ error: 'Delivery does not exists' });
        }

        const newDelivery = await delivery.update(req.body);

        return res.status(200).json({ newDelivery });
    }
}

export default new DeliveryController();
