import express from 'express';
import routes from './routes/index.js';

const port = 3000;
const app = express();
app.use('/api/v1/', routes);

app.listen(port, () => console.log(`Running as localhost:${port}/`));