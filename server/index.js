const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { submitVisitRequest, getSafeErrorMessage } = require('./visitRequestService');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = new Set(
  [process.env.CLIENT_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'].filter(Boolean)
);

app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.size === 0 || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
  })
);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/visit-request', async (req, res) => {
  try {
    const result = await submitVisitRequest(req.body, { ip: req.ip });

    if (result?.error) {
      return res.status(result.status || 400).json({ status: 'Error', message: result.message });
    }

    return res.status(200).json({ status: 'Success', message: 'Success' });
  } catch (error) {
    console.error('Visit request submission failed.', error);
    return res.status(500).json({ status: 'Error', message: getSafeErrorMessage(error) });
  }
});

app.use((_req, res) => {
  res.status(404).json({ status: 'Error', message: 'Not found.' });
});

app.listen(port, () => {
  console.log(`Visit request server running on port ${port}`);
});
