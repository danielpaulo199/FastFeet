import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { email, password_hash } = req.body;
    }
}

export default new SessionController();
