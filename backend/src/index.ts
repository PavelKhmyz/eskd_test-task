import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import router from '@routes/index.js';
import { errorHandler } from '@middlewares/errorHandler.js';

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Custom-Header']
}));

app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
