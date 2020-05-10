import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
    isAfter,
    isBefore,
    setSeconds,
    setMinutes,
    setHours,
    startOfDay,
    endOfDay,
} from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

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

    async withdraw(req, res) {
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

        if (dbDelivery.end_date !== null) {
            return res.status(400).json({ error: 'Delivery already ended' });
        }

        if (dbDelivery.start_date !== null) {
            return res.status(400).json({ error: 'Delivery already started' });
        }

        if (dbDelivery.canceled_at !== null) {
            return res.status(400).json({ error: 'Delivery canceled' });
        }

        const initialDate = new Date();
        const initialHour = setHours(
            setMinutes(setSeconds(initialDate, 8), 0),
            0
        );
        const finalHour = setHours(
            setMinutes(setSeconds(initialDate, 18), 0),
            0
        );

        if (
            isAfter(initialDate, finalHour) ||
            isBefore(initialDate, finalHour)
        ) {
            return res.status(400).json({
                error:
                    'Deliveries can only be withdraw beetwen 8:00 am and 18:00 pm',
            });
        }

        const { count: numberOfDeliveries } = await Delivery.findAndCountAll({
            where: {
                deliveryman_id: id,
                start_date: {
                    [Op.between]: [
                        startOfDay(initialDate),
                        endOfDay(initialDate),
                    ],
                },
            },
        });

        if (numberOfDeliveries >= 5) {
            return res
                .status(400)
                .json({ error: 'You cant only withdraw 5 deliveries a day' });
        }
        req.body.start_date = new Date();

        const updatedDelivery = await dbDelivery.update(req.body);

        return res.status(200).json({ updatedDelivery });
    }

    async finish(req, res) {
        const schema = Yup.object().shape({
            end_date: Yup.date().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation failed' });
        }

        const deliveryman = await Deliveryman.findByPk(req.params.id);
        if (!deliveryman) {
            return res.status(400).json({ error: 'Invalid Deliveryman' });
        }

        const delivery = await Delivery.findByPk(req.params.delivery);
        if (!delivery) {
            return res.status(400).json({ error: 'Invalid Delivery' });
        }

        if (delivery.deliveryman_id !== deliveryman.id) {
            return res
                .status(200)
                .json({ error: 'You dont have this delivery' });
        }

        if (delivery.start_date === null) {
            return res.status(400).json({ error: 'Delivery not started' });
        }

        if (delivery.end_date !== null) {
            return res.status(400).json({ error: 'Delivery already ended' });
        }

        if (delivery.canceled_at !== null) {
            return res.status(400).json({ error: 'Delivery is canceled' });
        }

        const signature = await File.findByPk(delivery.signature_id);

        if (!signature) {
            return res.status(400).json({ error: 'Signature row not found' });
        }

        if (signature.path === null && signature.name === null) {
            return res
                .status(400)
                .json({ error: 'Signature not provided yet' });
        }

        await delivery.update(req.body);

        return res.status(200).json({ delivery });
    }

    async signature(req, res) {
        const { originalname: name, filename: path } = req.file;

        const signature = await File.findByPk(req.params.delivery);
        if (!signature) {
            return res.status(400).json({ error: 'Signature row not find' });
        }

        await signature.update({ name, path });

        return res.status(200).json({ signature });
    }
}

export default new DeliverymanAccessController();
