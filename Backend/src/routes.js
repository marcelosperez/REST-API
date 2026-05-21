import { Router } from 'express';
import SessionController from './controllers/SessionController.js';

const routes = new Router();

routes.get('/sessions', SessionController.store);

export default routes;