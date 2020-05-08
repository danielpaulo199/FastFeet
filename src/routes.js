import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DMAController from './app/controllers/DeliverymanAccessController';

import AuthMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/login', SessionController.store);

routes.get('/deliveryman/:id/deliveries', DMAController.index);
routes.get('/deliveryman/:id/deliveries/dones', DMAController.show);

routes.put('/deliveryman/:id/:delivery/takeoff', DMAController.update);

routes.use(AuthMiddleware);
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);

export default routes;
