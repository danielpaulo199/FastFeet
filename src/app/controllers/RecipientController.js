import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            complemento: Yup.string().required(),
            estado: Yup.string().required(),
            cidade: Yup.string().required(),
            cep: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validations data failed!' });
        }
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

    async index(req, res) {
        const users = await Recipient.findAll();

        return res.status(200).json(users);
    }
}

export default new RecipientController();
