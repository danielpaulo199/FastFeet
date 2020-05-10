import DeliveryProblem from '../models/Delivery-problem';

class DeliveryProblemController {
    async store(req, res) {
        const problem = await DeliveryProblem.create(req.body);
        return res.status(200).json({ problem });
    }
}

export default new DeliveryProblemController();
