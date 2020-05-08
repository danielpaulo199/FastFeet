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
        console.log(recipient_id);
        if (!recipient) {
            return res.status(400).json({ error: 'Recipient does not exists' });
        }

        const delivery = await Delivery.create(req.body);
        return res.status(201).json({ delivery });
    }

    async index(req, res) {
        const deliverys = await Delivery.findAll();
        return res.status(200).json({ deliverys });
    }
}

export default new DeliveryController();
