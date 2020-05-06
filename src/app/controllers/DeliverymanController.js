import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Failed.' });
        }
        const { email } = req.body;

        const checkDeliveryman = await Deliveryman.findOne({
            where: { email },
        });

        if (checkDeliveryman) {
            return res
                .status(401)
                .json({ error: 'Deliveryman already exists' });
        }

        const deliveryman = await Deliveryman.create(req.body);

        return res.json(deliveryman);
    }

    async index(req, res) {
        const deliverymans = await Deliveryman.findAll();

        return res.json(deliverymans);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation Failed.' });
        }

        const { id } = req.params;
        const deliveryman = await Deliveryman.findByPk(id);

        if (!deliveryman) {
            return res
                .status(400)
                .json({ message: 'Delivery man does not exists' });
        }

        const { name, email } = await deliveryman.update(req.body);
        return res.status(200).json({ id, name, email });
    }
}

export default new DeliverymanController();
