import dotenv from 'dotenv';
import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import routes from './routes/index.js';
import { connectDB } from './lib/db.js';
import { configureCloudinary } from './lib/cloudinary.js';

const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envFile });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use('/api/v1/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Running as http://localhost:${process.env.PORT}/`)
  
  connectDB();
  configureCloudinary()
});