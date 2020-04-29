import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import AuthMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/login', SessionController.store);

routes.use(AuthMiddleware);
routes.get('/recipients', RecipientController.index);
routes.post('/recipients/create', RecipientController.store);

export default routes;
