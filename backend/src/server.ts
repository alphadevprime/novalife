import express from 'express';
import { pool } from './db/pool.ts';

const port = Number(process.env.PORT ?? '3000');
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

const app = express();
app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).json({
    service: 'jeu-vie-backend',
    status: 'ok',
    health: '/health',
  });
});

app.get('/health', async (_request, response) => {
  try {
    await pool.query('SELECT 1');
    response.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database health check failed:', error);
    response.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

await pool.query('SELECT 1');

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
