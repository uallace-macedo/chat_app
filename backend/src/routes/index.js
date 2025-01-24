import { Router } from 'express';
import authRoutes from './auth.route.js';

const routes = Router();
routes.use('/auth', authRoutes);
routes.get('/', (req, res) => res.send('Hello, world!'));

export default routes;