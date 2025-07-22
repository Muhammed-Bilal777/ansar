import { IntializeObservability } from './obervability/tracing';

IntializeObservability();
import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { appRouter } from './routes';
import { errorHandler } from './middlewares/errorHandler';
import { registry, reqCounter } from './obervability/promClient';
import { connectDB } from './config/db';
dotenv.config();

//express app
const app = express();

//
app.use(cookieParser());
//constants
const PORT = process.env.PORT || 4000;

//database
connectDB();

// ─────────── Middleware to count requests ───────────
app.use((req, res, next) => {
  res.on('finish', () => {
    if (req.originalUrl === '/metrics') return;

    reqCounter
      .labels(req.method, req.originalUrl.split('?')[0], String(res.statusCode))
      .inc();
  });
  next();
});

// ─────────── Metrics endpoint ───────────
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', registry.contentType);
  res.end(await registry.metrics());
});

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);
app.use(express.json());
app.use('/api', appRouter);

// Global error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
