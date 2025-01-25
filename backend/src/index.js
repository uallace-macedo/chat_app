import dotenv from 'dotenv';
import express from 'express'
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';
import { connectDB } from './lib/db.js';

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/v1/', routes);

app.listen(PORT, () => {
  console.log(`Running as http://localhost:${PORT}/`)
  connectDB();
});