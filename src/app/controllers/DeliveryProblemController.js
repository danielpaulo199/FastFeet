import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
    async store(req, res) {
        const schema = Yup.object().shape({
            description: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        const delivery_id = req.params.id;

        const delivery = await Delivery.findByPk(delivery_id);
        if (!delivery) {
            return res.status(400).json({ error: 'Invalid Delivery' });
        }
        req.body.delivery_id = delivery_id;
        const problem = await DeliveryProblem.create(req.body);
        return res.status(200).json({ problem });
    }

    async show(req, res) {
        const problems = await DeliveryProblem.findAll({
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: [
                        'id',
                        'product',
                        'recipient_id',
                        'deliveryman_id',
                    ],
                },
            ],
        });
        if (problems.length === 0) {
            return res
                .status(400)
                .json({ error: 'There are no deliveries with problems' });
        }

        return res.status(200).json({ problems });
    }

    async index(req, res) {
        const delivery_id = req.params.id;

        const delivery = await DeliveryProblem.findAll({
            where: { delivery_id },
            include: [
                {
                    model: Delivery,
                    as: 'delivery',
                    attributes: [
                        'id',
                        'product',
                        'recipient_id',
                        'deliveryman_id',
                    ],
                },
            ],
        });

        if (delivery.length === 0) {
            return res.status(400).json({ error: 'Delivery not found' });
        }

        return res.status(200).json({ delivery });
    }
}

export default new DeliveryProblemController();
