import { Router } from 'express';
import authRoutes from './auth.route.js';
import messageRoutes from './message.route.js';

const routes = Router();
routes.use('/auth', authRoutes);
routes.use('/message', messageRoutes);
routes.get('/', (req, res) => res.send('Hello, world!'));

export default routes;