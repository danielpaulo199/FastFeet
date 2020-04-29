import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const {
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        } = await Recipient.create(req.body);

        return res.status(201).json({
            name,
            rua,
            numero,
            complemento,
            estado,
            cidade,
            cep,
        });
    }
}

export default new RecipientController();
