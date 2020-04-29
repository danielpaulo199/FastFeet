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

    async show(req, res) {
        const users = await Recipient.findAll();

        return res.status(200).json(users);
    }
}

export default new RecipientController();
