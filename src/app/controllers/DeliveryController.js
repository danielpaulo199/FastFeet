import Delivery from '../models/Delivery';

class DeliveryController {
    async store(req, res) {
        const delivery = await Delivery.create(req.body);
        return res.status(201).json({ delivery });
    }
}

export default new DeliveryController();
