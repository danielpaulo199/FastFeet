import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = Router();

routes.post('/login', SessionController.store);

routes.get('/recipients', RecipientController.show);
routes.post('/recipients/create', RecipientController.store);

export default routes;
